import { Component, signal } from '@angular/core';

import { PanelComponent, ResetComponent, ThemeComponent } from 'rasaui';

@Component({
   selector: 'sandbox-root',
   imports: [ResetComponent, ThemeComponent, PanelComponent],
   templateUrl: './app.html',
   styles: []
})
export class App {
   public readonly panelType = signal<'normal' | 'spaced' | 'slim' | 'spaceless'>('slim');
}
