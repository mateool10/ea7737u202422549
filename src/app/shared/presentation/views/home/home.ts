import {Component, inject} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../../sports-centers/application/sports-centers.store';
import {SportsCenterSummary} from '../../../../sports-centers/presentation/components/sports-center-summary/sports-center-summary';

/**
 * Home view with the summary of the sports centers.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, TranslatePipe, SportsCenterSummary],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected store = inject(SportsCentersStore);
  cols = toSignal(inject(BreakpointObserver).observe('(max-width: 800px)').pipe(map(state => state.matches ? 1 : 2)), {initialValue: 2});

  constructor() {
    this.store.loadReservations();
  }
}
