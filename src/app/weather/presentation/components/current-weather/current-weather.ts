import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {WeatherStore} from '../../../application/weather.store';

/**
 * Shows the current temperature of the selected sports center.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-current-weather',
  imports: [TranslatePipe, MatProgressBar],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.css'
})
export class CurrentWeather {
  protected readonly store = inject(WeatherStore);
}
