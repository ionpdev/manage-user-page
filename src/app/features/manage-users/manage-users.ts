import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  imports: [],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsers {}
