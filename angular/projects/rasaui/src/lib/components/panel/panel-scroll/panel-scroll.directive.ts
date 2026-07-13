import { Directive, inject } from '@angular/core';

import { PanelComponent } from '../panel.component';

@Directive({
   selector: 'rasa-panel-scroll'
})
export class PanelScrollDirective {
   private readonly panel = inject(PanelComponent, { optional: true });

   public constructor() {
      if (this.panel == null) {
         throw new Error('Directive rasa-panel-scroll can only be used inside component rasa-panel');
      }
   }
}
