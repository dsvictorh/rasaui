import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PanelScrollXDirective } from './panel-scroll-x.directive';
import { PanelComponent } from '../panel.component';

@Component({
   imports: [PanelComponent, PanelScrollXDirective],
   template: '<rasa-panel><rasa-panel-scroll-x /></rasa-panel>',
   encapsulation: ViewEncapsulation.None
})
class TestPanelComponent {}

@Component({
   imports: [PanelScrollXDirective],
   template: '<rasa-panel-scroll-x />',
   encapsulation: ViewEncapsulation.None
})
class TestNoPanelComponent {}

describe('PanelScrollDirective', () => {
   it('Should instantiate when in panel component', async () => {
      await TestBed.configureTestingModule({
         imports: [TestPanelComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestPanelComponent);
      expect(fixture).toBeTruthy();
   });

   it('Should throw error when not in panel component', async () => {
      await TestBed.configureTestingModule({
         imports: [TestNoPanelComponent]
      }).compileComponents();

      expect(() => TestBed.createComponent(TestNoPanelComponent)).toThrow(
         'Directive rasa-panel-scroll-x can only be used inside component rasa-panel'
      );
   });
});
