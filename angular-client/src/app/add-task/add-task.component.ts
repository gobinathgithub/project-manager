import { Component, OnInit } from '@angular/core';
import { TaskDetailsModel } from '../../model/task';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../ngb-date-for-parser-formatter';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskDetails = new TaskDetailsModel();
  private startDate: NgbDate;
  private endDate: NgbDate;
  public hoveredDate: NgbDate;
  selectedProject: any;
  public priorty: number = 0;
  private priortyBar: any;
  public priortyOptions: Options = {
    floor: 0,
    ceil: 30,
    step: 1,
    minLimit: 1,
    maxLimit: 30
  };
  public priortyValidation: boolean = false;
  projectEnableBtn: boolean = true;
  userEnableBtn: boolean = true;
  buttonValue: any = 'Add';
  public searchProject: any;
  public searchParent: any;
  public searchUser: any;
  public formatterProject: any;
  public formatterParent: any;
  public formatterUser: any;
  spinner: boolean = false;
  projectInformation: any;
  errorMessage: any;
  parentTask: boolean = false;
  parentTaskNameModel: any;
  userInforamtion: any;
  userName: any = [];
  selectedUser: any;
  parentTaskInfo: any = [];
  private taskValues:  any;
  searchProjectBtnDisabled: boolean = false;
  parentTaskBtnDisabled: boolean = false;
  parentTaskSearchBtnDisabled: boolean = false;
  userSearchBtnDisable: boolean = false;

  constructor(private service: CommonService, private _date: DateFormatPipe, private calendar: NgbCalendar, private _dateParser: NgbDateFRParserFormatter,
    private modalService: NgbModal, private router: Router, private shared: SharedService) {
      this.taskValues = this.shared.TaskModel; // TaskModel should have the information when we select Edit Task
      this.startDate = (this.taskValues && this.taskValues.startDate) ?
        NgbDate.from(this._dateParser.parse(this._date.transform(this.taskValues.startDate, 'yyyy/MM/dd'))) :
        calendar.getToday(); // Set the start date when component intialise for add task and edit task
      this.endDate = (this.taskValues && this.taskValues.endDate) ?
        NgbDate.from(this._dateParser.parse(this._date.transform(this.taskValues.endDate, 'yyyy/MM/dd'))) :
        calendar.getNext(calendar.getToday(), 'd', 1); // Set the end date when component intialise for add task and edit task
    }
  
  /**
   * When component initialze required informations/methods should call
   */
  ngOnInit() {
    this.getProject();
    this.getTask();
    this.getUser();
    this.editTaskValues();
  }

  /**
   * This method should call for EDIT task to set the values to corresponding models
   */
  editTaskValues() {
    this.buttonValue = (this.taskValues && this.taskValues.project && this.taskValues.task && this.taskValues.priorty && this.taskValues.user) ? 'Update' : 'Add';
    this.taskDetails.task = (this.taskValues && this.taskValues.task) ? this.taskValues.task : '';
    this.priorty = (this.taskValues && this.taskValues.priorty) ? this.taskValues.priorty : 0;
    this.taskDetails.parentTask = (this.taskValues && this.taskValues.parentTask) ? this.taskValues.parentTask : false;
    this.parentTaskBtnDisabled = (this.taskValues  && this.taskValues.project && this.taskValues.task && this.taskValues.user) ? true : false;
    this.searchProjectBtnDisabled = (this.taskValues && this.taskValues.project) ? true : false;
  }

  /**
   * This method should call to get the existing project informations and show it in screen
   */
  getProject() {
    this.spinner = true;
    this.service.getProject().subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          if (res.data.length >= 1) {
            this.projectInformation = res.data;
            this.projectNgBootstrapTypeahead(this.projectInformation);
            this.setProjectInformation(this.projectInformation);
          } else {
            this.searchProjectBtnDisabled = true;
          }
          this.spinner = false;
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

  /**
   * This method should call for EDIT task to set the informations to the view
   * @param projectInfo : Existing project informations should passed from getProject API call
   */
  setProjectInformation(projectInfo) {
    if (this.taskValues && this.taskValues.project && projectInfo) {
      projectInfo.filter(item => {
        if (item._id === this.taskValues.project) {
          this.selectedProject = item;
          this.taskDetails.project = item.projectName;
          this.projectEnableBtn = (this.taskValues && this.taskValues.project && this.taskDetails.project) ? false : true;
        }
      })
    }
  }

/**
 * This method should call to show the model to select Project/Parent Task/User
 * @param managerModel : Modal Name
 */
  open(managerModel) {
    this.modalService.open(managerModel);
  }

  /**
   * This method should call when we select the start date & end date
   * @param date - should have both startDate and endDate
   */
  onDateSelection(date: NgbDate) {
    if (!this.startDate && !this.endDate) {
      this.startDate = date;
    } else if (this.startDate && !this.endDate && date.after(this.startDate)) {
      this.endDate = date;
    } else {
      this.endDate = null;
      this.startDate = date;
    }
  }

  /**
   * This method should call when we hover in date selection
   * @param date - should have both startDate and endDate
   */
  isHovered(date: NgbDate) {
    return this.startDate && !this.endDate && this.hoveredDate && date.after(this.startDate) && date.before(this.hoveredDate);
  }

  /**
   * This method should call when we select any dates from date picker
   * @param date - should have both fromDate and toDate
   */
  isInside(date: NgbDate) {
    return date.after(this.startDate) && date.before(this.endDate);
  }

  /**
   * This method should call when we select fromDate and toDate to check valid date
   * @param date - should have both fromDate and toDate
   */
  isRange(date: NgbDate) {
    return date.equals(this.startDate) || date.equals(this.endDate) || this.isInside(date) || this.isHovered(date);
  }

  /**
   * This method should call for get the user informations from DB
   */
  getUser() {
    this.spinner = true;
    this.service.getUser().subscribe(
      (res: any) => {
        if (res) {
          if (res.data.length >= 1) {
            this.userInforamtion = res.data;
            this.spinner = false;
            this.userInforamtion.filter(item => {
              this.userName.push({'name': item.firstName + ', ' + item.lastName, '_id': item._id, 'employeeId': item.employeeId});
            });
            this.userNgBootstrapTypeahead(this.userName);
            this.setUserInformation(this.userName);                 
          } else {
            this.userSearchBtnDisable = true;
          }
        } else {
          this.errorMessage = 'Failed: ' + res.message;
          this.spinner = false;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }

  /**
   * This method should call to bring user informations when component initialize
   */
  userNgBootstrapTypeahead(user) {
    this.searchUser = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : user.filter(project =>
        project.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatterUser = (a: {name: string}) => {
      return a.name;
    };
  }

  /**
   * This method should call for EDIT task to set the selected user value in view
   * @param userInfo : User information from API call
   */
  setUserInformation(userInfo) {
    if (this.taskValues && this.taskValues.user && userInfo) {
      userInfo.filter(item => {
        if (item._id === this.taskValues.user) {
          this.taskDetails.user = item.name;
          this.selectedUser = item;
          this.userEnableBtn = (this.taskValues && this.taskValues.user && this.taskDetails.user) ? false : true; 
        }
      })
    }
  }

  /**
   * This method should call, when we select any project from modal box
   */
  selectProject() {
    this.projectEnableBtn = (this.selectedProject && this.selectedProject._id) ? false : true;
    this.taskDetails.project = this.selectedProject.projectName;
  }

/**
 * This method should call, when we select any user from modal box
 */
  selectUser() {
    this.userEnableBtn = (this.selectedUser && this.selectedUser._id) ? false : true;
    this.taskDetails.user = this.selectedUser.name;
  }

/**
 * This method should call, when we select any parent task from modal box
 */
  selectParentTask() {
    this.taskDetails.parent = this.parentTaskNameModel.task;
  }

/**
 * This method should call when we reset the form for both New Task and Edit Task
 */
  resetForm() {
    this.taskValues = new TaskDetailsModel();
    this.userEnableBtn = true;
    this.projectEnableBtn = true;
    this.selectedUser = '';
    this.parentTaskNameModel = '';
    this.selectedProject = '';
    this.startDate = this.calendar.getToday();
    this.endDate = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.searchProjectBtnDisabled = false;
    this.parentTaskBtnDisabled = false;
    if (this.buttonValue === 'Update') {
      this.buttonValue = 'Add';
    }
  }

/**
 * This method should call when we click add/update button and store/update the informations to DB 
 */
  addTask(task, taskForm) {
    this.spinner = true;
    if (this.taskValues && this.taskValues._id) {
      task._id = this.taskValues._id;
    }
    task.project = this.selectedProject._id;
    task.priorty = this.priorty;
    task.startDate = this._dateParser.format(this.startDate);
    task.endDate = this._dateParser.format(this.endDate);
    task.user = (this.selectedUser && this.selectedUser._id) ? this.selectedUser._id : '';
    task.parent = (this.parentTaskNameModel && this.parentTaskNameModel._id) ? this.parentTaskNameModel._id : null;
    taskForm.reset();
    if (this.buttonValue === 'Add') {
      this.service.addTask(task).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {
            this.resetModel();
            this.getTask();
            this.router.navigateByUrl('/view-task');      
            this.spinner = false;
          } else {
            this.spinner = false;
            this.errorMessage = 'Failed: ' + res.message;
          }
        }, (error) => {
          this.spinner = false;
          this.errorMessage = 'We are having some technical error, please try after sometime to add new user...!!!';
        }
      )
    } else {
      this.service.updateTask(task).subscribe(
        (data) => {
          this.buttonValue = 'Add';
          this.resetModel();
          this.router.navigateByUrl('/view-task');   
          this.spinner = false;
        }, (error) => {
          this.spinner = false;
          this.errorMessage = 'We are having some technical error, please try after sometime to update this user...!!!';
        }
      )
    }
  }

/**
 * This method should to reset the model
 */
  resetModel() {
    this.taskDetails = new TaskDetailsModel();
  }

/**
 * This method should to get the existing task informations from DB
 */
  getTask() {
    this.spinner = true;
    this.service.getTask().subscribe(
      (res: any) => {
        if(res.success && res.success !== false) {
          if (res.data.length >= 1) {
            this.spinner = false;
            res.data.filter(item => {
                this.parentTaskInfo.push(item);
            })
            this.parentNgBootstrapTypeahead(this.parentTaskInfo);              
            this.setParentInformation(this.parentTaskInfo);
          } else {
            this.parentTaskSearchBtnDisabled = true;
          }
        } else {
          this.spinner = false;
          this.errorMessage = 'Failed: ' + res.message;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing task informations...!!!';
      }
    )
  }

  /**
   * This method should call to bring Parent Task informations when component initialize
   */
  parentNgBootstrapTypeahead(ptTaskName) {
    this.searchParent = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : ptTaskName.filter(project =>
        project.task.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatterParent = (a: {task: string}) => {
      return a.task;
    };
  }

/**
 * This method should call for EDIT task to show the existing values to modal
 * @param taskInfo : Task informations from DB
 */
  setParentInformation(taskInfo) {   
    if (this.taskValues && this.taskValues.parent && taskInfo) {
      taskInfo.filter(item => {
        if (item._id === this.taskValues.parent) {
          this.taskDetails.parent = item.task;
          this.parentTaskNameModel = item;
        }
      })
    }
  }
}
