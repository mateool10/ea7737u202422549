import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {SportsCenterAssembler} from './sports-center-assembler';
import {SportsCentersResponse} from './sports-centers-response';

export class SportsCentersApiEndpoint {
  private endpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSportsCentersEndpointPath}`;
  private assembler = new SportsCenterAssembler();

  constructor(private http: HttpClient) {}

  getAll(): Observable<SportsCenter[]> {
    return this.http.get<SportsCentersResponse>(this.endpointUrl)
      .pipe(map(response => this.assembler.toEntitiesFromResponse(response)));
  }
}
