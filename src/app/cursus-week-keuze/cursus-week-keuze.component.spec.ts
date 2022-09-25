import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusWeekKeuzeComponent } from './cursus-week-keuze.component';

describe('CursusWeekKeuzeComponent', () => {
  let component: CursusWeekKeuzeComponent;
  let fixture: ComponentFixture<CursusWeekKeuzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusWeekKeuzeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusWeekKeuzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
