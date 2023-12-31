import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[uixclickoutside]',
    standalone: true,
})

export class UixClickOutsideDirective {

    constructor(private el : ElementRef) {}

    @Output() clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    onClick(event: MouseEvent, target : HTMLElement){
        if (!target){
            return;
        }

        const clickedTarget = this.el.nativeElement.contains(target);
        if (!clickedTarget){
            this.clickOutside.emit(event);
        }
    }

}