import { Component, Input, EventEmitter, Output, AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClass } from '../common-behaviors/base';
import { Colors } from '../common-behaviors/colors';
import { createColorObject } from '../common-behaviors/common';
@Component({
  selector: 'uix-chip, [chip], chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class UixChipsComponent implements AfterViewInit, OnDestroy{
  _closeable : boolean  = false;
  isVisible : boolean = true;
  private styles : BaseClass;
  /* Text inside chip should default to text inside app-chip component/directive*/
  @Input() color? : string;
  @Input() bgcolor? : string;
  @Input() fill :  'clear' | 'outline' | 'solid' = 'solid'
  @Input() variant?: 'lighter' | 'light' | 'dark' | 'darker'
  @Input() 
  public set closeable(val : string | boolean){
    this._closeable = (typeof(val) === 'string' || val === true) ? true : false;
  }
  @Input() closeIconSrc? : string = '';
  @Output() closeChip: EventEmitter<any> = new EventEmitter();

  constructor(public el : ElementRef){  
    this.styles  = new BaseClass( new Colors(el));
  }
  onCloseChip(){
    this.isVisible = false;
    this.closeChip?.emit();
    this.ngOnDestroy();
    this.el.nativeElement.remove();
  }

  ngOnDestroy(): void {
    
  }

  ngAfterViewInit(): void {
    this.styles.colors.addColors(createColorObject(this.bgcolor!, this.color!, this.fill, this.variant!));
  }
}