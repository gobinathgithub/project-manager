import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormatPipe', pure: false })
export class DateFormatPipe implements PipeTransform {
    transform(value: any, format: string): string {
        let formatedDate = '';
        if (value && format) {
            formatedDate = moment(value, ['MM/DD/YYYY', moment.ISO_8601]).format(format.toUpperCase());
        } else if (value) {
            formatedDate = moment(value, ['MM/DD/YYYY', moment.ISO_8601]).format('MM/DD/YYYY');
        }
        return formatedDate;
    }
}
