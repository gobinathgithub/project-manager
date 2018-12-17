export class TaskDetailsModel {
    project: any;
    task: any;
    priorty: number;
    parent: any;
    startDate: Date;
    endDate: Date;
    user: any;
    parentTask: boolean = false;
    status: boolean = false;
}