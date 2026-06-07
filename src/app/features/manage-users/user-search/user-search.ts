import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearch {
  /** Two-way: emits `termChange` as the user types. */
  readonly term = model('');
}
