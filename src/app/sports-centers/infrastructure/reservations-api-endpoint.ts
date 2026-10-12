import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Reservation} from '../domain/model/reservation.entity';
import {ReservationAssembler} from './reservation-assembler';
import {ReservationResource, ReservationsResponse} from './reservations-response';

export class ReservationsApiEndpoint {
  private endpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`;
  private assembler = new ReservationAssembler();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reservation[]> {
    return this.http.get<ReservationsResponse>(this.endpointUrl)
      .pipe(map(response => this.assembler.toEntitiesFromResponse(response)));
  }

  create(reservation: Reservation): Observable<Reservation> {
    const request = this.assembler.toRequestFromEntity(reservation);
    return this.http.post<ReservationResource>(this.endpointUrl, request)
      .pipe(map(resource => this.assembler.toEntityFromResource(resource)));
  }
}
