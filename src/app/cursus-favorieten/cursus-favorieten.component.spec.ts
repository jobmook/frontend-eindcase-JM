import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusFavorietenComponent } from './cursus-favorieten.component';

describe('CursusFavorietenComponent', () => {
  let component: CursusFavorietenComponent;
  let fixture: ComponentFixture<CursusFavorietenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursusFavorietenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusFavorietenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
