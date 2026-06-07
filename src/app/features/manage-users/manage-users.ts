import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NewUser } from '@manage-users/shared';
import { UserService } from '../../core/services/user.service';
import { UiEmptyState } from '../../shared/ui/empty-state/empty-state';
import { UserForm } from './user-form/user-form';
import { UserList } from './user-list/user-list';

@Component({
  selector: 'app-manage-users',
  imports: [UserForm, UserList, UiEmptyState],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsers {
  protected readonly userService = inject(UserService);

  protected onAdd(user: NewUser): void {
    this.userService.addUser(user).catch((err) => console.error('Failed to add user', err));
  }
}
