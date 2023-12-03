import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UixDropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: UixDropdownComponent;
  let fixture: ComponentFixture<UixDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UixDropdownComponent]
    });
    fixture = TestBed.createComponent(UixDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
