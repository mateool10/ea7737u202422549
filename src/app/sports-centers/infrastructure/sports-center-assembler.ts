import {SportsCenter} from '../domain/model/sports-center.entity';
import {SportsCenterResource, SportsCentersResponse} from './sports-centers-response';

export class SportsCenterAssembler {
  toEntityFromResource(resource: SportsCenterResource): SportsCenter {
    return new SportsCenter(resource.id, resource.name, resource.activityType, resource.capacity,
      resource.latitude, resource.longitude);
  }

  toEntitiesFromResponse(response: SportsCentersResponse): SportsCenter[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }
}

