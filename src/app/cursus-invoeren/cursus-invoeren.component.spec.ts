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
    spyOn(component, 'readFile')
    spyOn(component, 'fileValidation').and.returnValue([{
      "Titel": "C# Programmeren",
      "Cursuscode": "CNETIN",
      "Duur": "5 dagen",
      "Startdatum": "8/10/2018"
  }]);
    spyOn(component, 'objectenSturen')
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

  it('correct situation_should make a file validation array', () => {
    const str = 'Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n'
    let res = component.fileValidation(str);
    expect(res).toHaveSize(1);
  })

  it('should detect file input change', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))

    const inputElement  = fixture.debugElement.query(By.css('input[type=file]'));
    inputElement.nativeElement.files = dataTransfer.files;

    inputElement.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.fileEntity).toBeTruthy()
    expect(component.fileEntity.name).toBe('test-file.pdf')
    
});
});
