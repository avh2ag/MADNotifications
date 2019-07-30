import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(statusString: string, args?: any): any {
    const compareString = statusString.toLowerCase();
    if (compareString.includes('sent')) {
      return 'text-success';
    } else if (compareString.includes('error')) {
      return 'text-danger';
    } else if (compareString.includes('pending')) {
      return 'text-muted';
    }
    return '';
  }

}
