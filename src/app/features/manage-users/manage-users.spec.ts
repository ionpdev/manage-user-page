import { Signal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { User } from '../../core/models/user.schema';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { ToastService } from '../../shared/ui/toast/toast.service';
import { ManageUsers } from './manage-users';

function makeUser(partial: Partial<User>): User {
  return {
    id: 'id',
    username: 'user',
    role: 'Viewer',
    status: 'enabled',
    createdAt: null,
    updatedAt: null,
    ...partial,
  };
}

const USERS: User[] = [
  makeUser({ id: '1', username: 'Alice', role: 'Admin' }),
  makeUser({ id: '2', username: 'Bob', role: 'Editor' }),
  makeUser({ id: '3', username: 'Charlie', role: 'Viewer' }),
];

/**
 * Requirement: search filters the list by username OR role, case-insensitive.
 * We drive the real `visibleUsers` computed against a fake UserService so the
 * filter logic is tested in isolation from Firebase.
 */
describe('ManageUsers search filter', () => {
  const usersSignal = signal<User[]>(USERS);

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            users: usersSignal as Signal<User[]>,
            loading: signal(false),
          },
        },
        { provide: ThemeService, useValue: { dark: signal(false), toggle: () => {} } },
        { provide: ToastService, useValue: { success: () => {}, error: () => {} } },
      ],
    });
    // Read protected members through the instance for assertions.
    return TestBed.createComponent(ManageUsers).componentInstance as unknown as {
      searchTerm: { set(value: string): void };
      visibleUsers: () => User[];
    };
  }

  it('returns every user when the term is empty', () => {
    const cmp = createComponent();
    expect(cmp.visibleUsers()).toHaveLength(3);
  });

  it('matches by username, case-insensitively', () => {
    const cmp = createComponent();
    cmp.searchTerm.set('ali');
    expect(cmp.visibleUsers().map((u) => u.username)).toEqual(['Alice']);
  });

  it('matches by role', () => {
    const cmp = createComponent();
    cmp.searchTerm.set('editor');
    expect(cmp.visibleUsers().map((u) => u.username)).toEqual(['Bob']);
  });

  it('trims surrounding whitespace before matching', () => {
    const cmp = createComponent();
    cmp.searchTerm.set('  charlie  ');
    expect(cmp.visibleUsers().map((u) => u.username)).toEqual(['Charlie']);
  });

  it('returns nothing when no username or role matches', () => {
    const cmp = createComponent();
    cmp.searchTerm.set('zzz');
    expect(cmp.visibleUsers()).toEqual([]);
  });
});
