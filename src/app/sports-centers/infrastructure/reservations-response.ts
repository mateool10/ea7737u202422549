/**
 * Reservation resource returned by the fake API.
 * @author Jorge Mateo León Naupari
 */
export interface ReservationResource {
  id: number;
  sportsCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

/**
 * Response of the reservations endpoint.
 * @author Jorge Mateo León Naupari
 */
export type ReservationsResponse = ReservationResource[];
