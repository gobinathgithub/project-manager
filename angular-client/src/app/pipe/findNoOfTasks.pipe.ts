import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findNoOfTask'
})

export class FindNoOfTaskPipe implements PipeTransform {
    transform(projectId: any, taksInfo?: any, area?: any): any {
        if (area === 'count') {
            let taskList: any = [];
            taksInfo.filter(task => {
                if (task.project === projectId) {
                    taskList.push(task);
                }
            });
            return taskList.length;
        }
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
