import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchValue: any, screenName: any): any[] {
        if (!items) return [];
        return items.filter(item => {
            // This condition will execute for Add User screen filter
            if (screenName === 'user' && searchValue && item.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1 &&
                item.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1 &&
                ('' + item.employeeId).toLowerCase().indexOf(searchValue.toLowerCase()) === -1
            ) {
                return false;
            }
            // This condition will execute for Add Project screen filter
            if (screenName === 'project' && searchValue && item.projectName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1) {
                return false;
            }
            return true;
        });
    }
}