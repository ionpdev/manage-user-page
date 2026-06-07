import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type Tone = 'enabled' | 'disabled' | 'neutral';

@Component({
  selector: 'ui-badge',
  template: '<ng-content />',
  styleUrl: './badge.scss',
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadge {
  readonly tone = input<Tone>('neutral');
  protected readonly classes = computed(() => `ui-badge ui-badge--${this.tone()}`);
}
