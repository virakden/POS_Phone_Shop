import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listStockComponent } from './listStock.component';

describe('ProductsComponent', () => {
  let component: listStockComponent;
  let fixture: ComponentFixture<listStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(listStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
