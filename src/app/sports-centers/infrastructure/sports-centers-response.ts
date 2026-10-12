/**
 * Sports center resource returned by the fake API.
 * @author Jorge Mateo León Naupari
 */
export interface SportsCenterResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}

/**
 * Response of the sports-centers endpoint.
 * @author Jorge Mateo León Naupari
 */
export type SportsCentersResponse = SportsCenterResource[];
