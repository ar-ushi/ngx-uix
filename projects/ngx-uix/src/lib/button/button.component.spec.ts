import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UixButtonComponent } from './button.component';

describe('UixButtonComponent', () => {
  let component: UixButtonComponent;
  let fixture: ComponentFixture<UixButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UixButtonComponent],
    });

    fixture = TestBed.createComponent(UixButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event', () => {
    spyOn(component.onClick, 'emit');
    const event = { type: 'click' } as any;
    component.onClickButton(event);
    expect(component.onClick.emit).toHaveBeenCalledWith(event);

    // Test for 'keydown' event
    spyOn(component.onClick, 'emit');
    const keyEvent = { type: 'keydown', key: 'Enter' } as any;
    component.onClickButton(keyEvent);
    expect(component.onClick.emit).toHaveBeenCalledWith(keyEvent);
  });
});
