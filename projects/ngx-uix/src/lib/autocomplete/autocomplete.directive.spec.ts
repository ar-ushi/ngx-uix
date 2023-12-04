import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UixAutoCompleteDirective } from './autocomplete.directive';
import { of } from 'rxjs';

@Component({
  template: `
    <input uixautocomplete [searchData]="data" (filteredDataList)="onFilteredDataList($event)" />
  `,
})
class TestComponent {
  data: any[] = [];
  filteredData: any[] = [];

  onFilteredDataList(data: any[]) {
    this.filteredData = data;
  }
}

describe('UixAutoCompleteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UixAutoCompleteDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(UixAutoCompleteDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(UixAutoCompleteDirective);
    expect(directive).toBeTruthy();
  });

  it('should emit filtered data on keyup', () => {
    const inputElement: HTMLInputElement = directiveElement.nativeElement;
    inputElement.value = 'searchTerm';
    inputElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.filteredData).toEqual([]);
  });

  it('should emit filtered data for static data on keyup', () => {
    const inputElement: HTMLInputElement = directiveElement.nativeElement;
    component.data = ['apple', 'banana', 'orange'];
    inputElement.value = 'a';
    inputElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.filteredData).toEqual(['apple']);
  });

  it('should debounce keyup events', (done) => {
    const inputElement: HTMLInputElement = directiveElement.nativeElement;
    component.data = ['apple', 'banana', 'orange'];

    const spy = spyOn(component, 'onFilteredDataList');

    inputElement.value = 'a';
    inputElement.dispatchEvent(new Event('keyup'));
    inputElement.value = 'ap';
    inputElement.dispatchEvent(new Event('keyup'));
    inputElement.value = 'app';
    inputElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 500); // Adjust the timeout based on your debounce value
  });

  it('should not emit filtered data when an invalid key is pressed', () => {
    const inputElement: HTMLInputElement = directiveElement.nativeElement;
    component.data = ['apple', 'banana', 'orange'];
    const spy = spyOn(component, 'onFilteredDataList');

    inputElement.value = 'a';
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' } as KeyboardEventInit));

    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});
