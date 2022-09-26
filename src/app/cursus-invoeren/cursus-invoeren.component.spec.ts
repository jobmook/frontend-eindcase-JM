import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
    spyOn(component, 'readFile');
    spyOn(component, 'fileValidation');
    spyOn(component, 'objectenSturen');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a read after button is clicked', () => {
    let instance = fixture.debugElement.nativeElement;
    let button = instance.querySelector('#fileOpsturen');
    button.click();
    expect(component.readFile).toHaveBeenCalled();
  })

  it('should detect input file but mark it as incorrect file format', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))

    const inputElement  = fixture.debugElement.query(By.css('input[type=file]'));
    inputElement.nativeElement.files = dataTransfer.files;

    inputElement.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.fileEntity).toBeTruthy()
    expect(component.fileEntity.name).toBe('test-file.pdf')
    expect(component.correctFormaat).toBe(false);
});
});
