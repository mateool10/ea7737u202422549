import {Component, inject} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';

/**
 * Main layout with toolbar, sidenav and router outlet.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatSidenavModule, MatListModule,
    MatButtonModule, TranslatePipe, LanguageSwitcher],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  isMobile = toSignal(inject(BreakpointObserver).observe('(max-width: 700px)').pipe(map(state => state.matches)), {initialValue: false});

  options = [
    {link: '/home', label: 'home'},
    {link: '/reservations/new', label: 'new-reservation'}
  ];
}
