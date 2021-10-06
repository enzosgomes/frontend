import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: string ): string {
    let datePattern : moment.Moment = moment(date, "YYYY-MM-DD");
    return datePattern.format("DD/MM/YYYY");
  }
}
