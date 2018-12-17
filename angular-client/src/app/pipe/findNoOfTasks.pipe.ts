import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findNoOfTask'
})

export class FindNoOfTaskPipe implements PipeTransform {
    transform(projectId: any, taksInfo?: any, area?: any): any {
        // This condition will execute to find the No of Tasks in Add Project screen
        if (area === 'count') {
            let taskList: any = [];
            taksInfo.filter(task => {
                if (task.project === projectId) {
                    taskList.push(task);
                }
            });
            return taskList.length;
        }
        // This condition will execute to find the status of tasks in Add Project screen
        if (area === 'status') {
            let taskStatus: any = [];
            taksInfo.filter(task => {
                if ((task.project === projectId) && task.status) {
                    taskStatus.push(task);
                }
            });
            return taskStatus.length;
        }
    }
}
