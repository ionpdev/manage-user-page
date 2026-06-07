import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

@Component({
  selector: 'button[uiButton]',
  template: '<ng-content />',
  styleUrl: './button.scss',
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButton {
  readonly variant = input<Variant>('primary');
  protected readonly classes = computed(() => `ui-btn ui-btn--${this.variant()}`);
}
