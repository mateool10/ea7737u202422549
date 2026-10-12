import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {WeatherStore} from '../../../application/weather.store';

@Component({
  selector: 'app-current-weather',
  imports: [TranslatePipe],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.css'
})
export class CurrentWeather {
  protected readonly store = inject(WeatherStore);
}

