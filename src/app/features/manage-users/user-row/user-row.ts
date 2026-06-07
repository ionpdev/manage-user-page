import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../../core/models/user.schema';
import { UiBadge } from '../../../shared/ui/badge/badge';

@Component({
  selector: 'tr[appUserRow]',
  imports: [UiBadge, DatePipe],
  templateUrl: './user-row.html',
  styleUrl: './user-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRow {
  readonly user = input.required<User>();
}
