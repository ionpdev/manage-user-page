import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '../../../core/models/user.schema';
import { UserRow } from '../user-row/user-row';

@Component({
  selector: 'app-user-list',
  imports: [UserRow],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  readonly users = input.required<User[]>();
  readonly edit = output<User>();
  readonly toggle = output<User>();
  readonly remove = output<User>();
}
