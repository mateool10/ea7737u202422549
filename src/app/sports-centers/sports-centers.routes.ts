import {Routes} from '@angular/router';

const reservationForm = () => import('./presentation/views/reservation-form/reservation-form').then(m => m.ReservationForm);

export const sportsCentersRoutes: Routes = [
  {path: 'new', loadComponent: reservationForm, title: 'UrbanFit - New Reservation'}
];
