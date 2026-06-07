import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'sm';

@Component({
  selector: 'button[uiButton]',
  template: '<ng-content />',
  styleUrl: './button.scss',
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButton {
  readonly variant = input<Variant>('primary');
  readonly size = input<Size>('md');
  protected readonly classes = computed(
    () => `ui-btn ui-btn--${this.variant()} ui-btn--${this.size()}`,
  );
}
