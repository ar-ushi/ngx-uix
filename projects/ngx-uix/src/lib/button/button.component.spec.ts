import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UixButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: UixButtonComponent;
  let fixture: ComponentFixture<UixButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UixButtonComponent]
    });
    fixture = TestBed.createComponent(UixButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
