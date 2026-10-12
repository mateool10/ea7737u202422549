import {Component, computed, inject, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCenter} from '../../../domain/model/sports-center.entity';
import {SportsCentersStore} from '../../../application/sports-centers.store';

@Component({
  selector: 'app-sports-center-summary',
  imports: [MatCardModule, TranslatePipe],
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

