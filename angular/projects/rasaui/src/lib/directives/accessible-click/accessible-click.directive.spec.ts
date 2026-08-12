import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AccessibleClickDirective, AccessibleClickEvent } from './accessible-click.directive';

@Component({
   standalone: true,
   imports: [AccessibleClickDirective],
   template: `
      <div
         [accessibleClick]="enabled()"
         [accessibleRole]="role()"
         [accessibleStopPropagation]="stopPropagation()"
         [accessibleTabIndex]="tabIndex()"
         (accessibleClick)="handleClick($event)">
         Test
      </div>
   `
})
class TestClickComponent {
   public readonly enabled = signal<boolean>(true);
   public readonly stopPropagation = signal<boolean>(false);
   public readonly role = signal<string>('button');
   public readonly tabIndex = signal<number>(0);

   public receivedEvent?: AccessibleClickEvent;

   public handleClick(event: AccessibleClickEvent): void {
      this.receivedEvent = event;
   }
}

describe('AccessibleClickDirective', () => {
   let fixture: ComponentFixture<TestClickComponent>;
   let component: TestClickComponent;
   let element: HTMLElement;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [TestClickComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(TestClickComponent);
      component = fixture.componentInstance;
      await fixture.whenStable();

      element = fixture.debugElement.query(By.directive(AccessibleClickDirective)).nativeElement;
   });

   it('Should emit when clicked', () => {
      const event = new MouseEvent('click');

      element.dispatchEvent(event);

      expect(component.receivedEvent).toBe(event);
   });

   it('Should emit when Enter is pressed', () => {
      const event = new KeyboardEvent('keydown', {
         key: 'Enter'
      });

      const preventDefault = vi.spyOn(event, 'preventDefault');

      element.dispatchEvent(event);

      expect(preventDefault).toHaveBeenCalled();
      expect(component.receivedEvent).toBe(event);
   });

   it('Should emit when Space is pressed', () => {
      const event = new KeyboardEvent('keydown', {
         key: ' '
      });

      const preventDefault = vi.spyOn(event, 'preventDefault');

      element.dispatchEvent(event);

      expect(preventDefault).toHaveBeenCalled();
      expect(component.receivedEvent).toBe(event);
   });

   it('Should not emit for other keys', () => {
      const event = new KeyboardEvent('keydown', {
         key: 'a'
      });

      element.dispatchEvent(event);

      expect(component.receivedEvent).toBeUndefined();
   });

   it('Should not emit click when disabled', () => {
      component.enabled.set(false);
      fixture.detectChanges();

      element.dispatchEvent(new MouseEvent('click'));

      expect(component.receivedEvent).toBeUndefined();
   });

   it('Should not emit keydown when disabled', () => {
      const event = new KeyboardEvent('keydown', {
         key: 'Enter',
         cancelable: true
      });

      component.enabled.set(false);
      fixture.detectChanges();

      element.dispatchEvent(event);

      expect(component.receivedEvent).toBeUndefined();
   });

   it('Should allow Tab when disabled but not emit keydown', () => {
      const event = new KeyboardEvent('keydown', {
         key: 'Tab',
         cancelable: true
      });

      component.enabled.set(false);
      fixture.detectChanges();

      const preventDefault = vi.spyOn(event, 'preventDefault');

      element.dispatchEvent(event);

      expect(preventDefault).not.toHaveBeenCalled();
      expect(component.receivedEvent).toBeUndefined();
   });

   it('Should stop propagation', () => {
      const event = new MouseEvent('click');
      const stopPropagation = vi.spyOn(event, 'stopPropagation');

      component.stopPropagation.set(true);
      fixture.detectChanges();

      element.dispatchEvent(event);

      expect(stopPropagation).toHaveBeenCalled();
      expect(component.receivedEvent).toBe(event);
   });

   it('Should not stop propagation', () => {
      const event = new MouseEvent('click');
      const stopPropagation = vi.spyOn(event, 'stopPropagation');

      element.dispatchEvent(event);

      expect(stopPropagation).not.toHaveBeenCalled();
      expect(component.receivedEvent).toBe(event);
   });

   it('Should set accessibility attributes', () => {
      component.enabled.set(false);
      fixture.detectChanges();

      expect(element.hasAttribute('role')).toBe(true);
      expect(element.hasAttribute('tabindex')).toBe(true);
      expect(element.hasAttribute('aria-disabled')).toBe(true);
   });
});
