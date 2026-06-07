import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { NewUser, UserRole } from '@manage-users/shared';
import { UiButton } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-user-form',
  imports: [FormField, UiButton],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  /** Emitted with a valid payload; the page performs the write. */
  readonly submitted = output<NewUser>();

  protected readonly roles = UserRole.options;
  protected readonly model = signal<NewUser>({ username: '', role: 'Viewer' });

  protected readonly userForm = form(this.model, (path) => {
    required(path.username);
    minLength(path.username, 2);
    required(path.role);
  });

  protected onSubmit(): void {
    if (this.userForm().invalid()) return;
    this.submitted.emit(this.model());
    this.model.set({ username: '', role: 'Viewer' });
  }
}
