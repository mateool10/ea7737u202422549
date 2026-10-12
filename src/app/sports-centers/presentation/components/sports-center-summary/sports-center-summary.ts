import {Component, computed, inject, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCenter} from '../../../domain/model/sports-center.entity';
import {SportsCentersStore} from '../../../application/sports-centers.store';

/**
 * Card with the reservations and indicators of a sports center.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-sports-center-summary',
  imports: [MatCardModule, MatListModule, TranslatePipe],
  templateUrl: './sports-center-summary.html',
  styleUrl: './sports-center-summary.css'
})
export class SportsCenterSummary {
  private store = inject(SportsCentersStore);
  sportsCenter = input.required<SportsCenter>();

  reservations = computed(() => this.store.getReservationsBySportsCenter(this.sportsCenter().id));
  totalParticipants = computed(() => this.store.getTotalParticipants(this.sportsCenter().id));
  availableCapacity = computed(() => this.store.getAvailableCapacity(this.sportsCenter()));
}
