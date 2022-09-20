import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusInvoerenComponent } from './cursus-invoeren.component';

describe('CursusInvoerenComponent', () => {
  let component: CursusInvoerenComponent;
  let fixture: ComponentFixture<CursusInvoerenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusInvoerenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusInvoerenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
