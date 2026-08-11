import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
   let fixture: ComponentFixture<IconComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [IconComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(IconComponent);
      fixture.componentRef.setInput('icon', 'test');
      await fixture.whenStable();
   });

   it('Should have appropriate material symbol classes', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.classList).toContain('material-symbols-outlined');
      expect(element.classList).toContain('material-symbols-rounded');
      expect(element.classList).toContain('material-symbols-sharp');

      fixture.componentRef.setInput('variation', 'outlined');
      fixture.detectChanges();
      expect(element.classList).toContain('material-symbols-outlined');
      expect(element.classList).not.toContain('material-symbols-rounded');
      expect(element.classList).not.toContain('material-symbols-sharp');

      fixture.componentRef.setInput('variation', 'rounded');
      fixture.detectChanges();
      expect(element.classList).toContain('material-symbols-rounded');
      expect(element.classList).not.toContain('material-symbols-outlined');
      expect(element.classList).not.toContain('material-symbols-sharp');

      fixture.componentRef.setInput('variation', 'sharp');
      fixture.detectChanges();
      expect(element.classList).toContain('material-symbols-sharp');
      expect(element.classList).not.toContain('material-symbols-rounded');
      expect(element.classList).not.toContain('material-symbols-outlined');
   });

   it('Should have fill class when fill property true', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.classList).not.toContain('fill');

      fixture.componentRef.setInput('fill', true);
      fixture.detectChanges();
      expect(element.classList).toContain('fill');

      fixture.componentRef.setInput('fill', false);
      fixture.detectChanges();
      expect(element.classList).not.toContain('fill');
   });
});
