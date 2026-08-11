import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
   selector: 'rasa-icon',
   templateUrl: './icon.component.html',
   styleUrl: './icon.component.less',
   host: {
      '[class]': 'class()'
   },
   encapsulation: ViewEncapsulation.None
})
export class IconComponent {
   public readonly icon = input.required<string>();
   public readonly fill = input<IconFill>('auto');
   public readonly variation = input<IconStyle>('auto');

   public readonly class = computed(() => `icon ${this.styleClass()} ${this.fillClass()}`);
   public readonly fillClass = computed(() => (this.fill() === true ? 'fill' : ''));
   public readonly styleClass = computed(() =>
      this.variation() != 'auto'
         ? `material-symbols-${this.variation()}`
         : 'material-symbols-outlined material-symbols-rounded material-symbols-sharp'
   );
}

export type IconFill = 'auto' | boolean;
export type IconStyle = 'auto' | 'outlined' | 'rounded' | 'sharp';
