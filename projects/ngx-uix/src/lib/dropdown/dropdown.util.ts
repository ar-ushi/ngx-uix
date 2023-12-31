export interface DropDownConfig{
    defaultOpen?: boolean;
    backgroundColor?: string;
    width?:string;
    shadow?:string;
    closeIconSrc?:string; //TODO - Replace with icon component
    multipleSelection?: boolean;
    limitSelection?:number;
    maximumSelectionErrorMsg: string;
    allowSearch: boolean;
}

export class DropdownItem {
    id!: String | number;
    text!: String | number;
    subtitle?: String|number;
    selected?: boolean;
    disabled? : boolean = false;
    [key: string] : any;

    public constructor(obj : any, textKey: string = 'text') {
        if (typeof obj === 'string' || typeof obj === 'number'){
            this.id = this.text = obj;
            this.selected = false;
            this.disabled = false;
        }
        if (typeof obj === 'object'){
            this.id = obj.id ? obj.id : obj[textKey];
            for (const key in obj){
                this[key] = obj[key];
            }
        }
    }
}
