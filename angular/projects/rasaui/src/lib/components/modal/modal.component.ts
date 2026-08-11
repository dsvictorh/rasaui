import { A11yModule } from '@angular/cdk/a11y';
import { NgClass } from '@angular/common';
import {
   AfterViewInit,
   Component,
   computed,
   effect,
   ElementRef,
   input,
   output,
   signal,
   viewChild,
   ViewEncapsulation
} from '@angular/core';

import { AccessibleClickDirective } from '../../directives';
import { IconComponent } from '../icon/icon.component';

@Component({
   selector: 'rasa-modal',
   imports: [A11yModule, NgClass, IconComponent, AccessibleClickDirective],
   templateUrl: './modal.component.html',
   styleUrl: './modal.component.less',
   encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements AfterViewInit {
   public readonly open = input.required<boolean>();
   public readonly size = input<ModalType>('auto');
   public readonly position = input<ModalPosition>('mid');
   public readonly transparent = input<boolean>(false);
   public readonly closeOnClickOutside = input<boolean>(true);
   public readonly openChange = output<boolean>();
   public readonly close = output<void>();

   public readonly active = signal<boolean>(false);
   public readonly classes = computed(() => `${this.size()} ${this.position()}`);

   private readonly modalRef = viewChild('modal', { read: ElementRef });

   private initialized: boolean;

   public constructor() {
      this.initialized = false;

      effect(() => {
         if (this.initialized && !this.open()) {
            this.emitClose();
         } else if (this.open()) {
            this.active.set(true);
            setTimeout(() => this.modalRef()?.nativeElement.blur(), 10);
         }
      });
   }

   public ngAfterViewInit(): void {
      this.initialized = true;
   }

   public onClickOutside(): void {
      if (this.closeOnClickOutside()) {
         this.openChange.emit(false);
      }
   }

   private emitClose(): void {
      setTimeout(() => {
         this.active.set(false);
         this.close.emit();
      }, 300);
   }
}

export type ModalType = 'auto' | 'small' | 'medium' | 'large';
export type ModalPosition = 'mid' | 'top' | 'bottom';
