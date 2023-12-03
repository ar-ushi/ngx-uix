import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClass } from '../common-behaviors/base';
import { Colors } from '../common-behaviors/colors';
import { createColorObject } from '../common-behaviors/common';
import { Size } from '../common-behaviors/size';
import { ButtonStyles } from './button.util';

@Component({
  selector: 'uix-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})


export class UixButtonComponent implements AfterViewInit{

_config : ButtonStyles = {
  width : '150px',
  height: '20px',
  fontSize : '10px',
  border: 'none',
  cursor : 'pointer'
};
@Input() size? : 'xs' | 's' | 'l' | 'xl'
@Input() color?: string;
@Input() bgcolor?: string;
@Input() fill :  'clear' | 'outline' | 'solid' = 'solid'
@Input() variant?: 'lighter' | 'light' | 'dark' | 'darker'
@Output() onClick = new EventEmitter<any>();
private styles : BaseClass;
buttonClasses : any[] = [];

onClickButton(event : any){
  if (event.type === 'click' || event.type === 'keydown' && event.key ==  'Enter'){
  this.onClick.emit(event);
  }
}

@Input()
public set config(obj : ButtonStyles){
  //only override defaults for value sent by parent
  this._config= {...this._config, ...obj};
}

constructor(public _elementRef : ElementRef){  
 this.styles  = new BaseClass( new Colors(_elementRef), new Size(_elementRef));
}

ngAfterViewInit(){
  this.styles.colors.addColors(createColorObject(this.bgcolor!, this.color!, this.fill, this.variant!));
  this.styles.size?.addSize(this.size!);
}
}