import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecentWorksComponent } from './admin-recent-works.component';

describe('AdminRecentWorksComponent', () => {
  let component: AdminRecentWorksComponent;
  let fixture: ComponentFixture<AdminRecentWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecentWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecentWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
