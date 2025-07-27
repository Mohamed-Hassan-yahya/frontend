import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardStock } from './admin-dashboard-stock';

describe('AdminDashboardStock', () => {
  let component: AdminDashboardStock;
  let fixture: ComponentFixture<AdminDashboardStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
