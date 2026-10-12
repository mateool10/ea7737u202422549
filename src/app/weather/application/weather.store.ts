import {inject, Service, signal} from '@angular/core';
import {Weather} from '../domain/model/weather.entity';
import {WeatherApi} from '../infrastructure/weather-api';

/**
 * Store with the current weather of the selected sports center.
 * @author Jorge Mateo León Naupari
 */
@Service()
export class WeatherStore {
  private readonly weatherApi = inject(WeatherApi);
  private readonly weatherSignal = signal<Weather | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal(false);

  readonly weather = this.weatherSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the current temperature of a location.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   */
  loadCurrentWeather(latitude: number, longitude: number): void {
    this.weatherSignal.set(null);
    this.errorSignal.set(false);
    this.loadingSignal.set(true);
    this.weatherApi.getCurrentWeather(latitude, longitude).subscribe({
      next: weather => {
        this.weatherSignal.set(weather);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set(true);
        this.loadingSignal.set(false);
      }
    });
  }

  clear(): void {
    this.weatherSignal.set(null);
    this.errorSignal.set(false);
  }
}
