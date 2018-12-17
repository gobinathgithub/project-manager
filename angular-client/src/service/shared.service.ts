import { Injectable } from '@angular/core';
import { TaskDetailsModel } from '../model/task';

@Injectable()
export class SharedService {
    public TaskModel: TaskDetailsModel;
}
