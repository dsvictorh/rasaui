import { Directive, effect, ElementRef, HostListener, inject, input, output, Renderer2 } from '@angular/core';

@Directive({
   selector: '[accessibleClick]'
})
export class AccessibleClickDirective {
   public readonly enabled = input.required<boolean>({ alias: 'accessibleClick' });
   public readonly stopPropagation = input<boolean>(false, { alias: 'accessibleStopPropagation' });
   public readonly role = input<string>('button', { alias: 'accessibleRole' });
   public readonly tabIndex = input<number>(0, { alias: 'accessibleTabIndex' });
   public readonly accessibleClick = output<AccessibleClickEvent>();

   @HostListener('click', ['$event'])
   public onClick(e: MouseEvent): void {
      this.handleClick(e);
   }

   @HostListener('keydown', ['$event'])
   public onKeydown(e: KeyboardEvent): void {
      this.handleKeydown(e);
   }

   private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
   private readonly renderer = inject(Renderer2);
   public constructor() {
      effect(() => {
         if (this.enabled()) {
            this.renderer.removeAttribute(this.elementRef.nativeElement, 'aria-disabled');
         } else {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-disabled', 'true');
         }
      });

      effect(() => this.renderer.setAttribute(this.elementRef.nativeElement, 'role', this.role()));
      effect(() => this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', this.tabIndex().toString()));
   }

   private handleKeydown(e: KeyboardEvent): void {
      if (this.stopPropagation()) {
         e.stopPropagation();
      }

      if (!this.enabled()) {
         if (e.key != 'Tab') {
            e.preventDefault();
         }
         return;
      }

      if (e.key == 'Enter' || e.key == ' ') {
         e.preventDefault();
         this.accessibleClick.emit(e);
      }
   }

   private handleClick(e: MouseEvent): void {
      if (this.stopPropagation()) {
         e.stopPropagation();
      }

      if (!this.enabled()) {
         return;
      }

      this.accessibleClick.emit(e);
   }
}

export type AccessibleClickEvent = MouseEvent | KeyboardEvent;
