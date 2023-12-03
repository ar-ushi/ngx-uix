import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UixChipsComponent } from './chips.component';

describe('ChipsComponent', () => {
  let component: UixChipsComponent;
  let fixture: ComponentFixture<UixChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UixChipsComponent]
    });
    fixture = TestBed.createComponent(UixChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
