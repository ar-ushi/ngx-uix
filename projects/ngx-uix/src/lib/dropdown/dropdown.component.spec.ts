import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UixDropdownComponent, UixDropdownControlValueAccessor } from './dropdown.component';
import { DropdownItem } from './dropdown.util';

describe('UixDropdownComponent', () => {
  let component: UixDropdownComponent;
  let fixture: ComponentFixture<UixDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UixDropdownComponent],
      imports: [FormsModule],
      providers: [UixDropdownControlValueAccessor],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UixDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle writeValue for a single option', () => {
    const option: DropdownItem = { id: '1', text: 'Option 1' };
    component.writeValue(option);
    fixture.detectChanges();
    expect(component.selectedOptions).toContain(option);
  });

  it('should handle writeValue for multiple options', () => {
    const options: DropdownItem[] = [{ id: '1', text: 'Option 1' }, { id: '2', text: 'Option 2' }];
    component.writeValue(options);
    fixture.detectChanges();
    expect(component.selectedOptions).toEqual(options);
  });

  it('should toggle dropdown when toggleDropdown is called', () => {
    spyOn(component.onCloseDropdown, 'emit');
    component.toggleDropdown();
    expect(component._config.defaultOpen).toBe(true);
    expect(component.onCloseDropdown.emit).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});


