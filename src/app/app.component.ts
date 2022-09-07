import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    title = 'test-ang';

    array = [
        {key: 1, value: 'Ukraine'},
        {key: 2, value: 'USA'},
        {key: 3, value: 'Portugal'},
        {key: 4, value: 'Canada'},
        {key: 5, value: 'United Kingdom'},
    ]

    arrayRaw = ['Ukraine', 'USA', 'Portugal', 'Canada', 'United Kingdom'];

    first: any = 1;
    second: any;
    third: any = ['USA'];

    ngOnInit() {
    }

    logValues() {
        console.log(this.first, this.second, this.third);
    }
}
