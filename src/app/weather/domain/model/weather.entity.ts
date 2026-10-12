/**
 * Weather entity.
 * @author Jorge Mateo León Naupari
 */
export class Weather {
  constructor(
    public latitude: number,
    public longitude: number,
    public temperature: number,
    public temperatureUnit: string,
    public measuredAt: string
  ) {}
}

