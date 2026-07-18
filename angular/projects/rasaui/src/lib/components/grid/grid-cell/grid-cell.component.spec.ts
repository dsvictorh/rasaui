import { Component, signal, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GridCellComponent } from './grid-cell.component';
import { GridComponent } from '../grid.component';

@Component({
   imports: [GridComponent, GridCellComponent],
   template:
      '<rasa-grid [columns]="1"><rasa-grid-cell [colFrom]="colFrom()" [colTo]="colTo()" [rowFrom]="rowFrom()" [rowTo]="rowTo()" /></rasa-grid>',
   encapsulation: ViewEncapsulation.None
})
class TestGridComponent {
   public readonly colFrom = signal<number>(0);
   public readonly colTo = signal<number>(0);
   public readonly rowFrom = signal<number>(0);
   public readonly rowTo = signal<number>(0);
}

@Component({
   imports: [GridCellComponent],
   template: '<rasa-grid-cell />',
   encapsulation: ViewEncapsulation.None
})
class TestNoGridComponent {}

describe('GridCellComponent', () => {
   it('Should have grid styles set using from and to', async () => {
      await TestBed.configureTestingModule({
         imports: [TestGridComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestGridComponent);
      const gridCell = fixture.debugElement.query(By.directive(GridCellComponent));
      const element = gridCell.nativeElement as HTMLElement;

      expect(element.style.gridColumn).toBe('');
      expect(element.style.gridRow).toBe('');

      fixture.componentInstance.colFrom.set(2);
      fixture.componentInstance.colTo.set(4);
      fixture.componentInstance.rowFrom.set(2);
      fixture.componentInstance.rowTo.set(4);
      fixture.detectChanges();

      expect(element.style.gridColumn).toBe('2 / 5');
      expect(element.style.gridRow).toBe('2 / 5');
   });

   it('Should have grid styles set using only from and ignoring to less than from', async () => {
      await TestBed.configureTestingModule({
         imports: [TestGridComponent]
      }).compileComponents();

      const fixture = TestBed.createComponent(TestGridComponent);
      const gridCell = fixture.debugElement.query(By.directive(GridCellComponent));
      const element = gridCell.nativeElement as HTMLElement;

      expect(element.style.gridColumn).toBe('');
      expect(element.style.gridRow).toBe('');

      fixture.componentInstance.colFrom.set(2);
      fixture.componentInstance.colTo.set(1);
      fixture.componentInstance.rowFrom.set(2);
      fixture.componentInstance.rowTo.set(1);
      fixture.detectChanges();

      expect(element.style.gridColumn).toBe('2 / 2');
      expect(element.style.gridRow).toBe('2 / 2');
   });

   it('Should throw error when not in grid component', async () => {
      await TestBed.configureTestingModule({
         imports: [TestNoGridComponent]
      }).compileComponents();

      expect(() => TestBed.createComponent(TestNoGridComponent)).toThrow(
         'Directive rasa-grid-cell can only be used inside component rasa-grid'
      );
   });
});
