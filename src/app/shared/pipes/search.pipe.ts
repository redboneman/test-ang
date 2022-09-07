import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(value: any[], search: string, limit: number = 20): any {
        if (value && value.length) {
            return value.filter(entry => JSON.stringify(entry).includes(search)).slice(0, limit)
        }
    }

}
