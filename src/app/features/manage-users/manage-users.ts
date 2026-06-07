import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NewUser } from '@manage-users/shared';
import { UserService } from '../../core/services/user.service';
import { UiEmptyState } from '../../shared/ui/empty-state/empty-state';
import { UserForm } from './user-form/user-form';
import { UserList } from './user-list/user-list';
import { UserSearch } from './user-search/user-search';

@Component({
  selector: 'app-manage-users',
  imports: [UserForm, UserSearch, UserList, UiEmptyState],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsers {
  protected readonly userService = inject(UserService);
  protected readonly searchTerm = signal('');

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

  protected onAdd(user: NewUser): void {
    this.userService.addUser(user).catch((err) => console.error('Failed to add user', err));
  }
}
