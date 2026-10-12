import {inject, Service, signal} from '@angular/core';
import {Weather} from '../domain/model/weather.entity';
import {WeatherApi} from '../infrastructure/weather-api';

/**
 * Store for the current weather.
 * @author Jorge Mateo León Naupari
 */
@Service()
export class WeatherStore {
  private readonly weatherApi = inject(WeatherApi);
  private readonly weatherSignal = signal<Weather | null>(null);

  readonly weather = this.weatherSignal.asReadonly();

  // TODO: handle the error when Open-Meteo fails
  loadCurrentWeather(latitude: number, longitude: number): void {
    this.weatherApi.getCurrentWeather(latitude, longitude).subscribe(weather => this.weatherSignal.set(weather));
  }
}
