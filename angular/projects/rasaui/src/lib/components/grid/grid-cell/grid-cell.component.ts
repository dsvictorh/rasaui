import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';

import { GridComponent } from '../grid.component';

@Component({
   selector: 'rasa-grid-cell',
   templateUrl: './grid-cell.component.html',
   host: {
      '[style]': 'style()'
   },
   encapsulation: ViewEncapsulation.None
})
export class GridCellComponent {
   private readonly grid = inject(GridComponent, { optional: true });

   public readonly colFrom = input<number>(0);
   public readonly colTo = input<number>(0);
   public readonly rowFrom = input<number>(0);
   public readonly rowTo = input<number>(0);

   public readonly style = computed(() => `${this.colSpan()} ${this.rowSpan()}`);
   public readonly colSpan = computed(
      () =>
         `grid-column: ${this.fixedColFrom()} / ${this.fixedColTo() >= this.fixedColFrom() ? this.fixedColTo() + 1 : this.fixedColFrom()};`
   );
   public readonly rowSpan = computed(
      () => `grid-row: ${this.rowFrom()} / ${this.rowTo() >= this.rowFrom() ? this.rowTo() + 1 : this.rowFrom()};`
   );

   public readonly fixedColFrom = computed(() =>
      this.colFrom() > this.grid!.columns() ? this.grid!.columns() : this.colFrom()
   );
   public readonly fixedColTo = computed(() =>
      this.colTo() > this.grid!.columns() ? this.grid!.columns() : this.colTo()
   );

   public constructor() {
      if (this.grid == null) {
         throw new Error('Directive rasa-grid-cell can only be used inside component rasa-grid');
      }
   }
}
