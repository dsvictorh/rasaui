import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ResetComponent, ThemeComponent } from 'rasaui';

@Component({
   selector: 'sandbox-root',
   imports: [RouterOutlet, ResetComponent, ThemeComponent],
   templateUrl: './app.html',
   styles: []
})
export class App {}
