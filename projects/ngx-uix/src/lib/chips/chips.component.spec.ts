import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { UixChipsComponent } from './chips.component';
import { By } from '@angular/platform-browser';
import { createColorObject } from '../common-behaviors/common';

@Component({
  template: '<uix-chip [color]="color" [bgcolor]="bgcolor" [fill]="fill" [variant]="variant" [closeable]="closeable" [closeIconSrc]="closeIconSrc" (closeChip)="onCloseChip()"></uix-chip>'
})
class TestComponent {
  color?: string;
  bgcolor?: string;
  fill: 'clear' | 'outline' | 'solid' = 'solid';
  variant?: 'lighter' | 'light' | 'dark' | 'darker';
  closeable?: boolean | string;
  closeIconSrc?: string;
  onCloseChipCalled = false;

  onCloseChip() {
    this.onCloseChipCalled = true;
  }
}

describe('UixChipsComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let chipComponent: UixChipsComponent;
  let chipElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UixChipsComponent, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    chipElement = fixture.debugElement.query(By.directive(UixChipsComponent));
    chipComponent = chipElement.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(testComponent).toBeTruthy();
    expect(chipComponent).toBeTruthy();
  });

  it('should set the styles on ngAfterViewInit', () => {
    spyOn(chipComponent['styles'].colors, 'addColors');
    chipComponent.ngAfterViewInit();
    expect(chipComponent['styles'].colors.addColors).toHaveBeenCalledOnceWith(createColorObject(testComponent.bgcolor!, testComponent.color!, testComponent.fill!, testComponent.variant!));
  });

  it('should emit closeChip event and hide chip on close button click', () => {
    spyOn(testComponent, 'onCloseChip');
    const closeIcon: DebugElement = chipElement.query(By.css('.close-icon'));

    closeIcon.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(testComponent.onCloseChip).toHaveBeenCalled();
    expect(chipComponent.isVisible).toBeFalsy();
  });

  it('should remove the element from the DOM on ngOnDestroy', () => {
    spyOn(chipComponent.el.nativeElement, 'remove');
    chipComponent.ngOnDestroy();
    expect(chipComponent.el.nativeElement.remove).toHaveBeenCalled();
  });

  it('should not remove the element from the DOM if isVisible is true', () => {
    spyOn(chipComponent.el.nativeElement, 'remove');
    chipComponent.isVisible = true;
    chipComponent.ngOnDestroy();
    expect(chipComponent.el.nativeElement.remove).not.toHaveBeenCalled();
  });
});
