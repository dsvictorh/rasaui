import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rasaui } from './rasaui';

describe('Rasaui', () => {
   let component: Rasaui;
   let fixture: ComponentFixture<Rasaui>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [Rasaui]
      }).compileComponents();

      fixture = TestBed.createComponent(Rasaui);
      component = fixture.componentInstance;
      await fixture.whenStable();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
