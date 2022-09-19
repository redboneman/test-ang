import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {countries} from './shared/placeholders/countries';
import {FrontRootService} from '@btcasino/front-root';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    title = 'test-ang';

    array = countries;

    arrayRaw = ['Ukraine', 'USA', 'Portugal', 'Canada', 'United Kingdom'];

    first: any = new FormControl('UA');
    second: any = new FormControl({name: 'Canada', code: 'CA'});
    third: any = new FormControl(['USA', 'UA', 'AF']);

    constructor(
        private test: FrontRootService
    ) {
        test.testMethod();
    }

    ngOnInit() {
    }

    logValues() {
        console.log(this.first, this.second, this.third);
    }
}
