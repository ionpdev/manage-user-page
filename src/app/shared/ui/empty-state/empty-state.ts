import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  template: '<p class="ui-empty"><ng-content /></p>',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiEmptyState {}
