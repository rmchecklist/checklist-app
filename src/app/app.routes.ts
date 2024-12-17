import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to home page
  // { path: 'day-to-day', loadChildren: () => import('./modules/day-to-day/day-to-day.module').then(m => m.DayToDayModule) },
  {
    path: 'trips',
    loadComponent: () =>
      import('./pages/trip-checklist/trip-checklist.component').then(
        (c) => c.TripChecklistComponent
      ),
  }, // Lazy load trips modulemodules/trips/trips.module').then(m => m.TripsModule) },
  // { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
  { path: '**', redirectTo: '' }, // Redirect unknown routes to home
];
