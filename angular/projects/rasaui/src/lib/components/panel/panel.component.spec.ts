import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
   let fixture: ComponentFixture<PanelComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [PanelComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(PanelComponent);
      await fixture.whenStable();
   });

   it('Should modify class attribute', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.classList).toContain('normal');
      expect(element.classList).toContain('straight');

      fixture.componentRef.setInput('type', 'spaced');
      fixture.componentRef.setInput('variation', 'semicurved');
      fixture.detectChanges();

      expect(element.classList).toContain('spaced');
      expect(element.classList).toContain('semicurved');
   });
});
