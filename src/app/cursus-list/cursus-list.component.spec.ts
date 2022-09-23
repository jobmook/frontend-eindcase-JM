import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusListComponent } from './cursus-list.component';

describe('CursusListComponent', () => {
  let component: CursusListComponent;
  let fixture: ComponentFixture<CursusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
