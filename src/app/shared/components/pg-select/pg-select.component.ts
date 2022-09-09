import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    Self
} from '@angular/core';
import {map, Observable, startWith, tap, timer} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
    selector: 'pg-select',
    templateUrl: './pg-select.component.html',
    styleUrls: ['./pg-select.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgSelectComponent implements OnInit, ControlValueAccessor {

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
    appearance: MatFormFieldAppearance = 'standard';
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();

    search = new FormControl('');
    displayedValue = '';

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
        const findValue = this.data.find((entry: any) => {
            if (this.valuePath) {
                return entry[this.valuePath] === this.value;
            } else {
                return JSON.stringify(entry) === JSON.stringify(this.value);
            }
        })
        if (findValue) {
            if (this.titlePath) {
                this.displayedValue = findValue[this.titlePath];
            } else {
                this.displayedValue = findValue;
            }
            this.search.setValue(this.displayedValue);
        }
    }

    clearClick(event: MouseEvent) {
        event.stopPropagation();
        this.displayedValue = '';
        this.search.setValue('');
        this.changes.detectChanges();
        this.value = null;
        this.valueChange.emit(null);
        this.onChangeFn(this.value);
    }

    focusIn(event: FocusEvent) {
        if ((event.relatedTarget as HTMLElement)?.nodeName === 'MAT-OPTION') {
            (event.target as HTMLInputElement).blur()
            return;
        }
        this.search.setValue('');
    }

    focusOut(event: FocusEvent) {
        if ((event.relatedTarget as HTMLElement)?.nodeName === 'MAT-OPTION') return;
        this.search.setValue(this.displayedValue);
    }

    searchChanged(value: any) {
        if (value && typeof value === 'string') {
            return this.data.filter((entry: any) => JSON.stringify(entry).toLowerCase().includes(value.toLocaleLowerCase()));
        }
        return this.data;
    }

    selectOption(event: MatAutocompleteSelectedEvent) {
        this.displayedValue = event.option.viewValue;
        this.search.setValue('');
        if (this.value === event.option.value) return;
        this.value = event.option.value;
        this.valueChange.emit(event.option.value);
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
