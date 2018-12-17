import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})

export class SortByPipe implements PipeTransform {
  transform(items: any[], path: string[], order: number, taskData?: any): any[] {
    // This condition will execute for task completed status for each project
    if (path && path[0] === '_id') { 
      let taskStatus: any = [];
      items.filter(item => {
        taskData.filter(task => {
          if ((task.project === item._id) && task.status) {
            taskStatus.push(task);
          }
        });
        path[0] = 'statusCount'; // Set path name to sort it
        item.statusCount = taskStatus.length; // Assign the completed task count status for each project
        taskStatus = []; // Set empty once compelted task count is assigned for the corresponding project
      })
    }
    if (!items || !path || !order) return items;
    return items.sort((a: any, b: any) => {
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })
      // Order * (-1): We change our order
      return a < b ? order : order * (- 1);
    })
  }
}