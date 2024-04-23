import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockDialogComponent } from './add-stock-dialog-component.component';

describe('AddStockDialogComponentComponent', () => {
  let component: AddStockDialogComponent;
  let fixture: ComponentFixture<AddStockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStockDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
