import {Weather} from '../domain/model/weather.entity';
import {WeatherResponse} from './weather-response';

export class WeatherAssembler {
  toEntityFromResponse(response: WeatherResponse): Weather {
    return new Weather(
      response.latitude,
      response.longitude,
      response.current.temperature_2m,
      response.current_units?.temperature_2m ?? '°C',
      response.current.time
    );
  }
}
