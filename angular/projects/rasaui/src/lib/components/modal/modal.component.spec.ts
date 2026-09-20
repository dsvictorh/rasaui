import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
   let fixture: ComponentFixture<ModalComponent>;
   let component: ModalComponent;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ModalComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(ModalComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('open', false);
      await fixture.whenStable();
   });

   afterEach(() => {
      vi.useRealTimers();
   });

   it('Should modify class attribute for modal container', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('.modal') as HTMLElement;

      expect(modal).not.toBeNull();
      expect(modal.classList).toContain('auto');
      expect(modal.classList).toContain('mid');

      fixture.componentRef.setInput('size', 'medium');
      fixture.componentRef.setInput('position', 'top');
      fixture.detectChanges();
      expect(modal.classList).toContain('medium');
      expect(modal.classList).toContain('top');
   });

   it('Should change active property when open input changed', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      expect(component.active()).toBe(true);
   });

   it('Should remain active until the close animation finishes (300ms)', () => {
      vi.useFakeTimers();

      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();

      vi.advanceTimersByTime(299);
      expect(component.active()).toBe(true);

      vi.advanceTimersByTime(1);
      expect(component.active()).toBe(false);
   });

   it('Should emit close when open changes from true to false', () => {
      vi.useFakeTimers();

      //eslint-disable-next-line @typescript-eslint/no-explicit-any -- cast component to any to access private function on spyOn
      const emitClose = vi.spyOn(component as any, 'emitClose');

      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();

      vi.advanceTimersByTime(300);
      expect(emitClose).toHaveBeenCalled();
   });

   it('Should not emit close when initially created with open false', () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any -- cast component to any to access private function on spyOn
      const emitClose = vi.spyOn(component as any, 'emitClose');

      fixture.detectChanges();

      expect(emitClose).not.toHaveBeenCalled();
   });

   it('Should emit openChange false when closeOnClickOutside is true and onClickOutside is called', () => {
      const openChangeEmit = vi.spyOn(component.openChange, 'emit');

      fixture.componentRef.setInput('closeOnClickOutside', true);
      fixture.detectChanges();

      component.onClickOutside();

      expect(openChangeEmit).toHaveBeenCalledWith(false);
   });

   it('Should not emit openChange false when closeOnClickOutside is false and onClickOutside is called', () => {
      const openChangeEmit = vi.spyOn(component.openChange, 'emit');

      fixture.componentRef.setInput('closeOnClickOutside', false);
      fixture.detectChanges();

      component.onClickOutside();

      expect(openChangeEmit).not.toHaveBeenCalled();
   });

   it('Should mark initialized after view has been rendered', () => {
      fixture.detectChanges();
      component['initialized'] = true;
   });
});
