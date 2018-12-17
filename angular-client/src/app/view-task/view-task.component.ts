import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { TaskDetailsModel } from '../../model/task';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  spinner: boolean = false;
  taskData: any = [];
  errorMessage: any;
  taskInfo: any = [];
  taskReframeInfo: any = [];
  path: string[];
  sortOrder: number = 1 // For ASC 1, For DESC -1
  selectedProject: any;
  taskDetails = new TaskDetailsModel();
  public searchProject: any;
  public formatterProject: any;
  projectInformation: any;
  projectSearchModal: any;
  projectSearchBtnDisable: boolean = false;

  constructor(private service: CommonService, private modalService: NgbModal, private shared: SharedService, private router: Router) { 
    this.shared.TaskModel = new TaskDetailsModel();
  }

  ngOnInit() {
    this.getTask();
    this.getProject();
  }

  getTask() {
    this.spinner = true;
    this.service.getTask().subscribe(
      (res: any) => {
        if(res.success && res.success !== false) {
          this.spinner = false;
          this.taskData = res.data;
          this.taskInfo = this.taskData;
          // res.data.filter(item => {
          //   if (!item.parentTask) {
          //     this.taskData.push(item);
          //   }
          // })
          console.log('this.parentTaskInfo: ', this.taskData);
          // this.parentNgBootstrapTypeahead(this.parentTaskInfo)
          console.log('Task info: ', this.taskInfo);
        } else {
          this.spinner = false;
          this.errorMessage = 'Failed: ' + res.message;
        }
      }, (error) => {
        this.spinner = false;
        console.log('Error..!');
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing task informations...!!!';
      }
    )
  }

  endTask(task) {
    this.spinner = true;
    task.status = true;
    task.endDate = new Date();
    this.service.updateTask(task).subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          console.log('Success');
          this.spinner = false;
        } else {
          console.log('Failed');
          this.spinner = false;
        }
      }
    )
  }

  sortTask(task: string) {
    this.path = task.split('.');
    this.sortOrder = this.sortOrder * (-1);
    return false;
  }

  /**
   * This method should call to bring project informations when component initialize
   */
  projectNgBootstrapTypeahead(name) {
    this.searchProject = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : name.filter(project =>
        project.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatterProject = (a: {projectName: string}) => {
      return a.projectName;
    };
  }

  selectProject() {
    console.log('selected Project: ', this.selectedProject);
    this.taskData = [];
    this.taskInfo.filter(item => {
      if ((this.selectedProject._id === item.project)) {
        this.taskData.push(item);
      } else
      if (this.selectedProject === '') {
        this.taskData.push(item);
      }
    });
    console.log('TaskList: ', this.taskData);
    this.projectSearchModal = this.selectedProject.projectName;
  }

  getProject() {
    this.spinner = true;
    this.service.getProject().subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          if (res.data.length >= 1) {
            this.projectInformation = res.data;
            this.projectNgBootstrapTypeahead(this.projectInformation);
            console.log('this.projectInformation: ', this.projectInformation);
            this.spinner = false;
          } else {
            this.projectSearchBtnDisable = true;
          }
        } else {
          this.spinner = false;
          this.errorMessage = 'Failed' + res.message;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the project information...!!!';
      }
    )
  }

  open(projectSearch) {
    this.modalService.open(projectSearch);
  }

  /**
   * Edit a corresponding task
   */
  editTask(task) {
    this.shared.TaskModel = task;
    this.router.navigateByUrl('/add-task');
  }

  // taskReframe(taskInfo) {
  //   this.taskData.filter(item => {
  //     if (item._id === taskInfo._id) {
  //       this.taskReframeInfo.push(item);
  //     }
  //   })
  // }

}
