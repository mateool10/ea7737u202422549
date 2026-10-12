export interface CurrentWeatherResource {
  time: string;
  interval: number;
  temperature_2m: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_units: { time: string; interval: string; temperature_2m: string };
  current: CurrentWeatherResource;
}

