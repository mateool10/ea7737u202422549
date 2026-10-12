/**
 * Reservation entity.
 * @author Jorge Mateo León Naupari
 */
export class Reservation {
  constructor(
    public id: number,
    public sportsCenterId: number,
    public activityType: string,
    public participantName: string,
    public participants: number,
    public weatherTemperature: number,
    public reservedAt: string
  ) {}
}
