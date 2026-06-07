import {
  EnvironmentInjector,
  Injectable,
  Signal,
  computed,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { map } from 'rxjs';
import {
  NewUser,
  NewUserSchema,
  RemoveUserRequest,
  RemoveUserResponse,
  UserStatus,
} from '@manage-users/shared';
import { User, UserSchema } from '../models/user.schema';

/** The single Firebase boundary. Nothing else imports AngularFire. */
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly fs = inject(Firestore);
  private readonly fns = inject(Functions);
  private readonly injector = inject(EnvironmentInjector);
  private readonly col = collection(this.fs, 'users');

  /** Raw live collection signal: `undefined` until the first snapshot resolves. */
  private readonly _users = toSignal(
    collectionData(query(this.col, orderBy('createdAt', 'desc')), { idField: 'id' }).pipe(
      map((rows) =>
        rows.flatMap((row) => {
          const parsed = UserSchema.safeParse(row);
          if (!parsed.success) {
            console.warn('Skipping malformed user document', parsed.error);
            return [];
          }
          return [parsed.data];
        }),
      ),
    ),
  );

  /** Live users, parsed at the boundary with UserSchema. */
  readonly users: Signal<User[]> = computed(() => this._users() ?? []);

  /** True until the first snapshot has resolved. */
  readonly loading: Signal<boolean> = computed(() => this._users() === undefined);

  addUser(input: NewUser) {
    const data = NewUserSchema.parse(input);
    return runInInjectionContext(this.injector, () =>
      addDoc(this.col, {
        ...data,
        status: 'enabled',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
    );
  }

  updateUser(id: string, input: Partial<NewUser>) {
    const data = NewUserSchema.partial().parse(input);
    return runInInjectionContext(this.injector, () =>
      updateDoc(doc(this.col, id), { ...data, updatedAt: serverTimestamp() }),
    );
  }

  setStatus(id: string, status: UserStatus) {
    return runInInjectionContext(this.injector, () =>
      updateDoc(doc(this.col, id), { status, updatedAt: serverTimestamp() }),
    );
  }

  /** Deletion goes through the Cloud Function (rules deny client delete). */
  removeUser(id: string) {
    return runInInjectionContext(this.injector, () => {
      const fn = httpsCallable<RemoveUserRequest, RemoveUserResponse>(this.fns, 'removeUser');
      return fn({ userId: id });
    });
  }
}
