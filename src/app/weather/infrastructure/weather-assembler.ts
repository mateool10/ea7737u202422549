import {Weather} from '../domain/model/weather.entity';
import {WeatherResponse} from './weather-response';

/**
 * Converts Open-Meteo responses into Weather entities.
 * @author Jorge Mateo León Naupari
 */
export class WeatherAssembler {
  /**
   * Converts a forecast response into a Weather entity.
   * @param response - Response of the forecast endpoint.
   */
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
