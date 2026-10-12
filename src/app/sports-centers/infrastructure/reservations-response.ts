export interface ReservationResource {
  id: number;
  sportsCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export type ReservationsResponse = ReservationResource[];

