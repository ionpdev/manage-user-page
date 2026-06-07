import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toaster',
  template: `
    <div class="toaster" aria-live="polite" aria-atomic="false">
      @for (t of toasts.toasts(); track t.id) {
        <div class="toast toast--{{ t.tone }}" role="status">
          <span class="toast__text">{{ t.text }}</span>
          <button type="button" class="toast__close" aria-label="Dismiss" (click)="toasts.dismiss(t.id)">
            ×
          </button>
        </div>
      }
    </div>
  `,
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toaster {
  protected readonly toasts = inject(ToastService);
}
