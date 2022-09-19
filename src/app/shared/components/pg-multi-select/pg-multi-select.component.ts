import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ViewChild
} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
    selector: 'pg-multi-select',
    templateUrl: './pg-multi-select.component.html',
    styleUrls: ['./pg-multi-select.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgMultiSelectComponent implements OnInit, ControlValueAccessor {

    @ViewChild('searchInput')
    searchInput: ElementRef<HTMLInputElement>;

    @Input()
    data: any[] = [];
    @Input()
    valuePath: string | undefined;
    @Input()
    titlePath: string | undefined;
    @Input()
    value: any;
    @Input()
    rawTitle: boolean = false;
    @Input()
    clearable: boolean = true;
    @Input()
    label: string = '';
    @Input()
    appearance: MatFormFieldAppearance = 'standard';
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();

    search = new FormControl('');

    public onChangeFn = (_: any) => {};
    public onTouchedFn = () => {};

    constructor(
        @Self() @Optional() public control: NgControl,
        private readonly changes: ChangeDetectorRef
    ) {
        if (this.control) {
            this.control.valueAccessor = this;
        }
    }

    ngOnInit(): void {
    }

    findValueInList(item: any) {
        return this.data.find((entry: any) => {
            if (this.valuePath) {
                return entry[this.valuePath] === item;
            } else {
                return JSON.stringify(entry) === JSON.stringify(item);
            }
        });
    }

    remove(index: number) {
        this.value.splice(index, 1);
    }

    selectOption(event: MatAutocompleteSelectedEvent) {
        this.search.setValue('');
        this.searchInput.nativeElement.value = '';
        if (this.value.includes(event.option.value)) return;
        this.value.push(event.option.value);
        this.valueChange.emit(this.value);
        this.onChangeFn(this.value);
        console.log(event);
    }

    getValueByPath(item: any) {
        if (!this.valuePath) return item;
        let result: any;
        try {
            result = item[this.valuePath];
        } catch (e) {
            console.error('INVALID VALUE PATH!', item);
        }
        return result || item;
    }

    getTitleByPath(item: any) {
        if (!this.titlePath) return item;
        let result: any;
        try {
            result = item[this.titlePath];
        } catch (e) {
            console.error('INVALID TITLE PATH!', item);
        }
        return result || item;
    }

    getTitleByPathFromList(item: any) {
        if (!this.titlePath) return item;
        const findValue = this.findValueInList(item);
        if (!findValue) return item;
        let result: any;
        try {
            result = findValue[this.titlePath];
        } catch (e) {
            console.error('INVALID TITLE PATH!', item);
        }
        return result || item;
    }

    public registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    public writeValue(obj: any): void {
        this.value = obj;
    }

}
