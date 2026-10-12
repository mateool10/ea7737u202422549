import {Reservation} from '../domain/model/reservation.entity';
import {ReservationResource, ReservationsResponse} from './reservations-response';
import {ReservationRequest} from './reservation-request';

/**
 * Converts reservation resources into entities and entities into requests.
 * @author Jorge Mateo León Naupari
 */
export class ReservationAssembler {
  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation(resource.id, resource.sportsCenterId, resource.activityType, resource.participantName,
      resource.participants, resource.weatherTemperature, resource.reservedAt);
  }

  toEntitiesFromResponse(response: ReservationsResponse): Reservation[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }

  toRequestFromEntity(entity: Reservation): ReservationRequest {
    return {
      sportsCenterId: entity.sportsCenterId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt
    };
  }
}
