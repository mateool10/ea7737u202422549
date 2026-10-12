import {Component, computed, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../application/sports-centers.store';
import {Reservation} from '../../../domain/model/reservation.entity';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {CurrentWeather} from '../../../../weather/presentation/components/current-weather/current-weather';

/**
 * Form to register a new reservation.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule,
    TranslatePipe, CurrentWeather],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm {
  private router = inject(Router);
  protected store = inject(SportsCentersStore);
  protected weatherStore = inject(WeatherStore);

  activityTypes = ['fitness', 'yoga', 'swimming', 'cycling'];
  errorMessage = signal('');
  saving = signal(false);
  selectedActivity = signal('');

  selectedSportsCenter = computed(() => this.store.getSportsCenterByActivityType(this.selectedActivity()));

  form = new FormGroup({
    activityType: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    participantName: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/\S+/)]}),
    participants: new FormControl(1, {nonNullable: true, validators: [Validators.required, Validators.min(1)]})
  });

  constructor() {
    this.weatherStore.clear();
    this.form.controls.activityType.valueChanges.subscribe(activityType => {
      this.selectedActivity.set(activityType);
      const sportsCenter = this.store.getSportsCenterByActivityType(activityType);
      if (sportsCenter) {
        this.weatherStore.loadCurrentWeather(sportsCenter.latitude, sportsCenter.longitude);
      }
    });
  }

  canCreate(): boolean {
    return this.form.valid && !!this.weatherStore.weather() && !this.saving();
  }

  onCreate(): void {
    const sportsCenter = this.selectedSportsCenter();
    const weather = this.weatherStore.weather();
    if (!sportsCenter || !weather || this.form.invalid) return;

    const value = this.form.getRawValue();
    const reservation = new Reservation(0, sportsCenter.id, value.activityType, value.participantName.trim(),
      value.participants, weather.temperature, new Date().toISOString());

    this.saving.set(true);
    this.errorMessage.set('');
    this.store.createReservation(reservation).subscribe({
      next: () => this.router.navigate(['/home']),
      error: error => {
        this.saving.set(false);
        this.errorMessage.set(error.message === 'capacity-error' ? 'capacity-error' : 'create-error');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
