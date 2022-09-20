import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/employees/employee/employees.component.spec.ts
import { CustomersComponent } from './employees.component';
========
import { EmployeeComponent } from './employee.component';
>>>>>>>> dd0b2b54d44643e61740b81025d51d143adbe7aa:src/app/pages/employees/employee/employee.component.spec.ts

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
