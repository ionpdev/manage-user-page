import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NewUser } from '@manage-users/shared';
import { User } from '../../core/models/user.schema';
import { UserService } from '../../core/services/user.service';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { UiEmptyState } from '../../shared/ui/empty-state/empty-state';
import { UserForm } from './user-form/user-form';
import { UserList } from './user-list/user-list';
import { UserSearch } from './user-search/user-search';

@Component({
  selector: 'app-manage-users',
  imports: [UserForm, UserSearch, UserList, UiEmptyState, ConfirmDialog],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsers {
  protected readonly userService = inject(UserService);
  protected readonly searchTerm = signal('');
  protected readonly editingId = signal<string | null>(null);

  /** The user awaiting delete confirmation, and whether the removal is in flight. */
  protected readonly removing = signal<User | null>(null);
  protected readonly removePending = signal(false);

  /** The form's pre-fill: the edited user's editable fields, or null when adding. */
  protected readonly editingInitial = computed<NewUser | null>(() => {
    const id = this.editingId();
    if (!id) return null;
    const user = this.userService.users().find((u) => u.id === id);
    return user ? { username: user.username, role: user.role } : null;
  });

  /** Client-side filter over the live list: username OR role, case-insensitive. */
  protected readonly visibleUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const all = this.userService.users();
    if (!term) return all;
    return all.filter(
      (u) =>
        u.username.toLowerCase().includes(term) || u.role.toLowerCase().includes(term),
    );
  });

  protected onSubmit(data: NewUser): void {
    const id = this.editingId();
    const op = id ? this.userService.updateUser(id, data) : this.userService.addUser(data);
    op.then(() => this.editingId.set(null)).catch((err) => console.error('Save failed', err));
  }

  protected startEdit(user: User): void {
    this.editingId.set(user.id);
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
  }

  protected toggleStatus(user: User): void {
    const next = user.status === 'enabled' ? 'disabled' : 'enabled';
    this.userService.setStatus(user.id, next).catch((err) => console.error('Toggle failed', err));
  }

  protected requestRemove(user: User): void {
    this.removing.set(user);
  }

  protected cancelRemove(): void {
    if (this.removePending()) return;
    this.removing.set(null);
  }

  protected confirmRemove(): void {
    const user = this.removing();
    if (!user) return;
    this.removePending.set(true);
    this.userService
      .removeUser(user.id)
      .then(() => this.removing.set(null))
      .catch((err) => console.error('Remove failed', err))
      .finally(() => this.removePending.set(false));
  }
}
