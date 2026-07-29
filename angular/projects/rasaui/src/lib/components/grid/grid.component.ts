import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
   selector: 'rasa-grid',
   templateUrl: './grid.component.html',
   styleUrl: './grid.component.less',
   host: {
      '[class]': 'class()',
      '[style]': 'style()'
   },
   encapsulation: ViewEncapsulation.None
})
export class GridComponent {
   public readonly columns = input.required<GridColumns>();
   public readonly laptopColumns = input<GridColumns>();
   public readonly laptopSmallColumns = input<GridColumns>();
   public readonly tabletColumns = input<GridColumns>();
   public readonly mobileColumns = input<GridColumns>();
   public readonly mobileSmallColumns = input<GridColumns>();
   public readonly rowTemplate = input<string>();
   public readonly autoRowTemplate = input<string>();

   public readonly class = computed(
      () =>
         `cols-${this.columns()} ${this.laptopColumnsClass()} ${this.laptopSmallColumnsClass()} ${this.tabletColumnsClass()} ${this.mobileColumnsClass()} ${this.mobileSmallColumnsClass()}`
   );
   public readonly laptopColumnsClass = computed(() =>
      this.laptopColumns() != null ? `cols-laptop-${this.laptopColumns()}` : ''
   );
   public readonly laptopSmallColumnsClass = computed(() =>
      this.laptopSmallColumns() != null ? `cols-laptop-sm-${this.laptopSmallColumns()}` : ''
   );
   public readonly tabletColumnsClass = computed(() =>
      this.tabletColumns() != null ? `cols-tablet-${this.tabletColumns()}` : ''
   );
   public readonly mobileColumnsClass = computed(() =>
      this.mobileColumns() != null ? `cols-mobile-${this.mobileColumns()}` : ''
   );
   public readonly mobileSmallColumnsClass = computed(() =>
      this.mobileSmallColumns() != null ? `cols-mobile-sm-${this.mobileSmallColumns()}` : ''
   );

   public readonly style = computed(() => `${this.rowTemplateStyle()} ${this.autoRowTemplateStyle()}`);
   public readonly rowTemplateStyle = computed(() =>
      this.rowTemplate() != null ? `grid-template-rows: ${this.rowTemplate()};` : ''
   );
   public readonly autoRowTemplateStyle = computed(() =>
      this.autoRowTemplate() != null ? `grid-auto-rows: ${this.autoRowTemplate()};` : ''
   );
}

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
