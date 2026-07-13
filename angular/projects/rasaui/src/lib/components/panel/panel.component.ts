import { Component, computed, contentChild, input, ViewEncapsulation } from '@angular/core';

import { PanelScrollXDirective } from './panel-scroll-x/panel-scroll-x.directive';
import { scrollX } from '../../functions';

@Component({
   selector: 'rasa-panel',
   imports: [],
   templateUrl: './panel.component.html',
   styleUrl: './panel.component.less',
   host: {
      '[class]': 'class()'
   },
   encapsulation: ViewEncapsulation.None
})
export class PanelComponent {
   public readonly type = input<'normal' | 'spaced' | 'slim' | 'spaceless'>('normal');
   public readonly variation = input<'straight' | 'semicurved' | 'curved'>('straight');

   public readonly class = computed(() => `${this.type()} ${this.variation()}`);

   public readonly panellScrollX = contentChild(PanelScrollXDirective);
   public readonly scrollX = scrollX;
}
