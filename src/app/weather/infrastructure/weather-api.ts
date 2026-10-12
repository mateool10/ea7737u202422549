import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Weather} from '../domain/model/weather.entity';
import {WeatherApiEndpoint} from './weather-api-endpoint';

/**
 * Api for the Open-Meteo weather service.
 * @author Jorge Mateo León Naupari
 */
@Service()
export class WeatherApi {
  private readonly http = inject(HttpClient);
  private readonly weatherEndpoint = new WeatherApiEndpoint(this.http);

  getCurrentWeather(latitude: number, longitude: number): Observable<Weather> {
    return this.weatherEndpoint.getCurrentWeather({latitude, longitude});
  }
}

