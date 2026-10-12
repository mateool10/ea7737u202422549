import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * View shown when the route does not exist.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  invalidPath = this.route.snapshot.url.map(segment => segment.path).join('/');

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
