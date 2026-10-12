import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCentersApiEndpoint} from './sports-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';

/**
 * Api of the sports-centers bounded context.
 * @author Jorge Mateo León Naupari
 */
@Service()
export class SportsCentersApi {
  private readonly http = inject(HttpClient);
  private readonly sportsCentersEndpoint = new SportsCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getSportsCenters(): Observable<SportsCenter[]> {
    return this.sportsCentersEndpoint.getAll();
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsEndpoint.getAll();
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.reservationsEndpoint.create(reservation);
  }
}
