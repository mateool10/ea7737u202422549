export interface SportsCenterResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}

export type SportsCentersResponse = SportsCenterResource[];

