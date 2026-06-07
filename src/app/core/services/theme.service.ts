import { Injectable, effect, signal } from '@angular/core';

const KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark = signal<boolean>(this.initial());

  constructor() {
    effect(() => {
      const isDark = this.dark();
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem(KEY, isDark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.dark.update((d) => !d);
  }

  private initial(): boolean {
    const stored = localStorage.getItem(KEY);
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
