import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UixTooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: UixTooltipComponent;
  let fixture: ComponentFixture<UixTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UixTooltipComponent]
    });
    fixture = TestBed.createComponent(UixTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
