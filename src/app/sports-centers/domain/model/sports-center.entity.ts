/**
 * Sports center entity.
 * @author Jorge Mateo León Naupari
 */
export class SportsCenter {
  constructor(
    public id: number,
    public name: string,
    public activityType: string,
    public capacity: number,
    public latitude: number,
    public longitude: number
  ) {}
}

