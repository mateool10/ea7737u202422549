import {Component, inject} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * EN / ES buttons to change the language.
 * @author Jorge Mateo León Naupari
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);
  languages = ['en', 'es'];
  currentLanguage = this.translate.getCurrentLang() ?? 'en';

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
