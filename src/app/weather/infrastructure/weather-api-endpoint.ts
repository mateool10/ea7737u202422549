import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Weather} from '../domain/model/weather.entity';
import {WeatherAssembler} from './weather-assembler';
import {WeatherRequest} from './weather-request';
import {WeatherResponse} from './weather-response';

export class WeatherApiEndpoint {
  private endpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;
  private assembler = new WeatherAssembler();

  constructor(private http: HttpClient) {}

  getCurrentWeather(request: WeatherRequest): Observable<Weather> {
    const params = {latitude: request.latitude, longitude: request.longitude, current: 'temperature_2m'};
    return this.http.get<WeatherResponse>(this.endpointUrl, {params})
      .pipe(map(response => this.assembler.toEntityFromResponse(response)));
  }
}

