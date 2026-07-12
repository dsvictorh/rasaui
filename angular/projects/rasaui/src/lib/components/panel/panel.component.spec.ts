import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
   let component: PanelComponent;
   let fixture: ComponentFixture<PanelComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [PanelComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(PanelComponent);
      component = fixture.componentInstance;
      await fixture.whenStable();
   });

   it('Should modify class attribute', () => {
      expect(component.class()).toContain('normal');
      expect(component.class()).toContain('straight');

      fixture.componentRef.setInput('type', 'spaced');
      fixture.componentRef.setInput('variation', 'semicurved');
      fixture.detectChanges();

      expect(component.class()).toContain('spaced');
      expect(component.class()).toContain('semicurved');
   });
});
