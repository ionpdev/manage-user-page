import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserRole } from '@manage-users/shared';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-manage-users',
  imports: [],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsers {
  protected readonly userService = inject(UserService);

  // TEMP — Phase 2 zoneless verification only; replaced by the real form in Phase 3.
  protected addSample(): void {
    const n = this.userService.users().length + 1;
    const roles = UserRole.options;
    void this.userService.addUser({ username: `user-${n}`, role: roles[n % roles.length] });
  }
}
