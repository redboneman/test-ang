import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, map, Observable, startWith, tap} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'pg-select',
    templateUrl: './pg-select.component.html',
    styleUrls: ['./pg-select.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgSelectComponent implements OnInit {

    @Input()
    data: any;
    @Input()
    valuePath: string | undefined;
    @Input()
    titlePath: string | undefined;
    @Input()
    value: any;
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    multiple: boolean = false;

    search = new FormControl('');
    filteredOptions: Observable<any>;

    constructor() {
        this.filteredOptions = this.search.valueChanges.pipe(
            startWith(''),
            map((value: string | null) => (value ? this.searchChanged(value) : this.data.slice()))
        );
    }

    ngOnInit(): void {
    }

    searchChanged(value: any) {
        console.log(value);
        if (value && typeof value === 'string') {
            return this.data.filter((entry: any) => JSON.stringify(entry).toLowerCase().includes(value.toLocaleLowerCase()));
        }
        return this.data;
    }

    selectOption(event: MatAutocompleteSelectedEvent) {
        this.search.setValue(event.option.viewValue);
        console.log(this.search);
        if (this.value === event.option.value) return;
        this.valueChange.emit(event.option.value);
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

}
