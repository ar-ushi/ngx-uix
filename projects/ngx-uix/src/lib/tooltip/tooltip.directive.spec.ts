import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UixTooltipDirective } from './tooltip.directive';
import { UixTooltipComponent } from './tooltip.component';

@Component({
  template: `
    <div uix-tooltip="Tooltip content"></div>
  `,
})
class TestComponent {}

describe('UixTooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UixTooltipDirective, UixTooltipComponent, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(UixTooltipDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    expect(directive).toBeTruthy();
  });

  it('should show tooltip on mouseenter', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    spyOn(directive as any, 'initializeToolTip');
    directive.onHover();
    expect((directive as any).initializeToolTip).toHaveBeenCalled();
  });

  it('should close tooltip on mouseleave', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    spyOn(directive, 'pushAndHideTooltip');
    directive.onMouseLeave();
    expect(directive.pushAndHideTooltip).toHaveBeenCalled();
  });

  it('should create and attach tooltip on mouseenter', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    spyOn(directive, 'createAndAttachTooltip');
    directive.onHover();
    expect(directive.createAndAttachTooltip).toHaveBeenCalled();
  });

  it('should push and hide tooltip on mouseleave', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    spyOn(directive, 'pushAndHideTooltip');
    directive.onMouseLeave();
    expect(directive.pushAndHideTooltip).toHaveBeenCalled();
  });

  it('should set tooltip properties when initializing tooltip', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    directive.tooltip = 'Test Tooltip';
    directive.position = 'above';
    directive.ttcolor = 'red';
    directive.ttbgcolor = 'yellow';
    directive.transition = 'fade-in';
    directive.duration = 500;

    spyOn(directive, 'createAndAttachTooltip').and.callThrough();
    directive.onHover();

    const tooltipComponent = directive['componentRef']!.instance;
    expect(tooltipComponent.tooltip).toBe('Test Tooltip');
    expect(tooltipComponent.position).toBe('above');
    expect(tooltipComponent.color).toBe('red');
    expect(tooltipComponent.bgcolor).toBe('yellow');
    expect(tooltipComponent.transition).toBe('fade-in');
    expect(tooltipComponent.duration).toBe(500);
  });

  it('should destroy tooltip on ngOnDestroy', () => {
    const directive = directiveElement.injector.get(UixTooltipDirective);
    spyOn(directive, 'destroy').and.callThrough();
    directive.ngOnDestroy();
    expect(directive.destroy).toHaveBeenCalled();
  });
});
