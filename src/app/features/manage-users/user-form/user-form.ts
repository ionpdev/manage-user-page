import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { NewUser, UserRole } from '@manage-users/shared';
import { UiButton } from '../../../shared/ui/button/button';

const EMPTY: NewUser = { username: '', role: 'Viewer' };

@Component({
  selector: 'app-user-form',
  imports: [FormField, UiButton],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  /** When set, the form is in edit mode and pre-filled with these values. */
  readonly initial = input<NewUser | null>(null);

  /** Emitted with a valid payload; the page performs the write (add or update). */
  readonly submitted = output<NewUser>();
  readonly cancelled = output<void>();

  protected readonly roles = UserRole.options;
  protected readonly editing = computed(() => this.initial() !== null);

  /** Resets to the edited user's values whenever `initial` changes. */
  protected readonly model = linkedSignal<NewUser>(() => this.initial() ?? { ...EMPTY });

  protected readonly userForm = form(this.model, (path) => {
    required(path.username);
    minLength(path.username, 2);
    required(path.role);
  });

  protected onSubmit(): void {
    if (this.userForm().invalid()) return;
    this.submitted.emit(this.model());
    if (!this.editing()) this.model.set({ ...EMPTY });
  }
}
