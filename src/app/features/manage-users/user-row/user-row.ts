import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { User } from '../../../core/models/user.schema';
import { TimeAgoPipe } from '../../../shared/time-ago.pipe';
import { UiBadge } from '../../../shared/ui/badge/badge';
import { UiButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'tr[appUserRow]',
  imports: [UiBadge, UiButton, DatePipe, TimeAgoPipe],
  templateUrl: './user-row.html',
  styleUrl: './user-row.scss',
  host: { '[class.row--disabled]': "user().status === 'disabled'" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRow {
  readonly user = input.required<User>();
  readonly edit = output<User>();
  readonly toggle = output<User>();
  readonly remove = output<User>();

  protected readonly toggleLabel = computed(() =>
    this.user().status === 'enabled' ? 'Disable' : 'Enable',
  );
}
