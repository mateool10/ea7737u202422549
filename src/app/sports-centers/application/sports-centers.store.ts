import {inject, Service, signal} from '@angular/core';
import {Observable, switchMap, tap, throwError} from 'rxjs';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCentersApi} from '../infrastructure/sports-centers-api';

/**
 * Store with the sports centers and their reservations.
 * @author Jorge Mateo León Naupari
 */
@Service()
export class SportsCentersStore {
  private readonly api = inject(SportsCentersApi);
  private readonly sportsCentersSignal = signal<SportsCenter[]>([]);
  private readonly reservationsSignal = signal<Reservation[]>([]);

  readonly sportsCenters = this.sportsCentersSignal.asReadonly();
  readonly reservations = this.reservationsSignal.asReadonly();

  constructor() {
    this.loadSportsCenters();
    this.loadReservations();
  }

  loadSportsCenters(): void {
    this.api.getSportsCenters().subscribe(sportsCenters => this.sportsCentersSignal.set(sportsCenters));
  }

  loadReservations(): void {
    this.api.getReservations().subscribe(reservations => this.reservationsSignal.set(reservations));
  }

  getSportsCenterByActivityType(activityType: string): SportsCenter | undefined {
    return this.sportsCenters().find(sportsCenter => sportsCenter.activityType === activityType);
  }

  getReservationsBySportsCenter(sportsCenterId: number): Reservation[] {
    return this.reservations().filter(reservation => reservation.sportsCenterId === sportsCenterId);
  }

  getTotalParticipants(sportsCenterId: number): number {
    return this.getReservationsBySportsCenter(sportsCenterId)
      .reduce((total, reservation) => total + reservation.participants, 0);
  }

  getAvailableCapacity(sportsCenter: SportsCenter): number {
    return sportsCenter.capacity - this.getTotalParticipants(sportsCenter.id);
  }

  /**
   * Creates a reservation after reloading the reservations and checking the available capacity.
   * @param reservation - Reservation to create.
   */
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.api.getReservations().pipe(
      tap(reservations => this.reservationsSignal.set(reservations)),
      switchMap(() => {
        const sportsCenter = this.sportsCenters().find(center => center.id === reservation.sportsCenterId);
        if (!sportsCenter || reservation.participants <= 0 || reservation.participants > this.getAvailableCapacity(sportsCenter)) {
          return throwError(() => new Error('capacity-error'));
        }
        return this.api.createReservation(reservation);
      }),
      tap(created => {
        console.log('reservation created', created);
        this.reservationsSignal.update(reservations => [...reservations, created]);
      })
    );
  }
}
