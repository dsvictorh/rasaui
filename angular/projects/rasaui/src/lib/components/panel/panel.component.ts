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
   public readonly type = input<PanelType>('normal');
   public readonly variation = input<PanelVariation>('straight');

   public readonly class = computed(() => `${this.type()} ${this.variation()}`);

   public readonly panellScrollX = contentChild(PanelScrollXDirective);
   public readonly scrollX = scrollX;
}

export type PanelType = 'normal' | 'spaced' | 'slim' | 'spaceless';
export type PanelVariation = 'straight' | 'semicurved' | 'curved';
