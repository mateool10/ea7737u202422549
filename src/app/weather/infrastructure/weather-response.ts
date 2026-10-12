/**
 * Current weather resource returned by Open-Meteo.
 * @author Jorge Mateo León Naupari
 */
export interface CurrentWeatherResource {
  time: string;
  interval: number;
  temperature_2m: number;
}

/**
 * Response of the Open-Meteo forecast endpoint.
 * @author Jorge Mateo León Naupari
 */
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_units: { time: string; interval: string; temperature_2m: string };
  current: CurrentWeatherResource;
}
