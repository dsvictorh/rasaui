import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
   let fixture: ComponentFixture<GridComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [GridComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(GridComponent);
      fixture.componentRef.setInput('columns', 1);
      await fixture.whenStable();
   });

   it('Should have column classes added', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.classList).toContain('cols-1');

      fixture.componentRef.setInput('laptopColumns', 2);
      fixture.detectChanges();
      expect(element.classList).toContain('cols-laptop-2');

      fixture.componentRef.setInput('laptopSmallColumns', 3);
      fixture.detectChanges();
      expect(element.classList).toContain('cols-laptop-sm-3');

      fixture.componentRef.setInput('tabletColumns', 4);
      fixture.detectChanges();
      expect(element.classList).toContain('cols-tablet-4');

      fixture.componentRef.setInput('mobileColumns', 5);
      fixture.detectChanges();
      expect(element.classList).toContain('cols-mobile-5');

      fixture.componentRef.setInput('mobileSmallColumns', 5);
      fixture.detectChanges();
      expect(element.classList).toContain('cols-mobile-sm-5');
   });

   it('Should have row template', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.style.gridTemplateRows).toBe('');

      fixture.componentRef.setInput('rowTemplate', '1fr 1fr 1fr');
      fixture.detectChanges();
      expect(element.style.gridTemplateRows).toBe('1fr 1fr 1fr');
   });

   it('Should have auto row template', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.style.gridAutoRows).toBe('');

      fixture.componentRef.setInput('autoRowTemplate', '1fr 1fr 1fr');
      fixture.detectChanges();
      expect(element.style.gridAutoRows).toBe('1fr 1fr 1fr');
   });
});
