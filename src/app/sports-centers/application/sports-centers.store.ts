import {inject, Service, signal} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCentersApi} from '../infrastructure/sports-centers-api';

/**
 * Store for the sports centers and their reservations.
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

  // TODO: re-check reservations and available capacity before the POST
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.api.createReservation(reservation).pipe(
      tap(created => this.reservationsSignal.update(reservations => [...reservations, created]))
    );
  }
}

