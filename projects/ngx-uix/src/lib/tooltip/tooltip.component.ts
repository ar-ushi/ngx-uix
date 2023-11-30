import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uix-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit{
  tooltip: string = '';
  position?: 'above' | 'below' | 'right' | 'left';
  left = 0;
  top = 0;
  color?: string;
  bgcolor?:string;
  duration? : number;
  transition? : 'fade-in' | 'fade-out' | 'none';
  tooltipStyles: any[] = [];
   
 constructor(private el : ElementRef) {}
 
   ngOnInit() {
     this.el.nativeElement.style.setProperty('--tooltip-bg-color', this.bgcolor);
     this.el.nativeElement.style.setProperty('--tooltip-txt-color', this.color);
     this.position && this.tooltipStyles.push(`tooltip--${this.position}`);
     this.transition && this.tooltipStyles.push(`tooltip--${this.transition}`);
     this.duration != undefined && this.tooltipStyles.push('tooltip--fade-out'); 
   }
 }