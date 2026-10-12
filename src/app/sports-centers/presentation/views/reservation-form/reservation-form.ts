import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../application/sports-centers.store';
import {Reservation} from '../../../domain/model/reservation.entity';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {CurrentWeather} from '../../../../weather/presentation/components/current-weather/current-weather';

/**
 * New reservation form.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    TranslatePipe, CurrentWeather],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm {
  private router = inject(Router);
  private store = inject(SportsCentersStore);
  private weatherStore = inject(WeatherStore);

  activityTypes = ['fitness', 'yoga', 'swimming', 'cycling'];
  errorMessage = signal('');

  form = new FormGroup({
    activityType: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    participantName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    participants: new FormControl(1, {nonNullable: true, validators: [Validators.required, Validators.min(1)]})
  });

  constructor() {
    this.form.controls.activityType.valueChanges.subscribe(activityType => {
      const sportsCenter = this.store.getSportsCenterByActivityType(activityType);
      if (sportsCenter) {
        this.weatherStore.loadCurrentWeather(sportsCenter.latitude, sportsCenter.longitude);
      }
    });
  }

  // TODO: check reservations again before the post
  onCreate(): void {
    const value = this.form.getRawValue();
    const sportsCenter = this.store.getSportsCenterByActivityType(value.activityType);
    const weather = this.weatherStore.weather();
    if (this.form.invalid || !sportsCenter || !weather) {
      this.errorMessage.set('create-error');
      return;
    }
    if (value.participants > this.store.getAvailableCapacity(sportsCenter)) {
      this.errorMessage.set('capacity-error');
      return;
    }

    const reservation = new Reservation(0, sportsCenter.id, value.activityType, value.participantName,
      value.participants, weather.temperature, new Date().toISOString());

    this.store.createReservation(reservation).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => this.errorMessage.set('create-error')
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
