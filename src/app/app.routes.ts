import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/manage-users/manage-users').then((m) => m.ManageUsers),
  },
];
