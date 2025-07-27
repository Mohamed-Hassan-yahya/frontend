import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Dashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: '', component: Dashboard },
];

export const appRouter = provideRouter(routes);