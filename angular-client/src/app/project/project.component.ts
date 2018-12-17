import { Component, OnInit } from '@angular/core';
import { ProjectDetailsModel } from '../../model/project';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../ngb-date-for-parser-formatter';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { SharedService } from '../../service/shared.service';
import { TaskDetailsModel } from '../../model/task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectDetails = new ProjectDetailsModel();
  public hoveredDate: NgbDate;
  private startDate: NgbDate;
  private endDate: NgbDate;
  setStartEndDate: boolean = false;
  public priorty: number = 0;
  private priortyBar: any;
  public priortyOptions: Options = {
    floor: 0,
    ceil: 30,
    step: 1,
    minLimit: 1,
    maxLimit: 30
  };
  buttonValue: any = 'Add';
  public search: any;
  public formatter: any;
  spinner: boolean = false;
  userInforamtion: any;
  errorMessage: any;
  selectedManager: any;
  managerName: any = [];
  editId: any;
  projectInformation: any;
  serachProject: any;
  managerDisabledBtn: boolean = true;
  path: string[];
  sortOrder: number = 1 // For ASC 1, For DESC -1
  deleteProjectInfo: any;
  taskData: any;
  managerSearchBtnDisable: boolean = false;
  projectAvailable: boolean = false;

  constructor(private service: CommonService, calendar: NgbCalendar, private _dateParser: NgbDateFRParserFormatter,
    private modalService: NgbModal, private shared: SharedService) {
    this.startDate = calendar.getToday();
    this.endDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.shared.TaskModel = new TaskDetailsModel();
  }

/**
 * When component initialze required informations/methods should call
 */
  ngOnInit() {
    this.getTask();
    this.getUser();
    this.getProject();
    this.priortyBar = document.getElementsByClassName('ng5-slider-span ng5-slider-bar');
    if (this.priorty > 0) {
      this.priortyBar[2]['style'].backgroundColor = '#42A948';
    }
  }

   /**
   * This method should call when we select the date
   * @param date - should have both fromDate and toDate
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
   * @param date - should have both fromDate and toDate
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
   * This method should call to bring Manager (User) informations when component initialize
   */
  ngBootstrapTypeahead(managerName) {
    this.search = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : managerName.filter(manager =>
        manager.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatter = (a: {name: string}) => {
      return a.name;
    };
  }

/**
 * This method call the existing user informations from DB
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
              this.managerName.push({'name': item.firstName + ', ' + item.lastName, '_id': item._id, 'employeeId': item.employeeId});
            });
            this.ngBootstrapTypeahead(this.managerName);
          } else {
            this.managerSearchBtnDisable = true;
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
 * This method should call when search manger and delete project actions
 * @param managerModel : Modal name to open
 * @param info : delete project informations
 */
  open(managerModel, info) {
    this.modalService.open(managerModel);
    if (info) this.deleteProjectInfo = info;
  }

/**
 * This method should when select manager from modal box and assign the same to view
 */
  selectManager() {
    this.managerDisabledBtn = false;
    this.projectDetails.manager = this.selectedManager.name;
  }

/**
 * This method should call to add project
 * @param project : Project information to add from form
 * @param projectForm : Project form to reset it
 */
  addProject(project, projectForm) {
    project.priorty = this.priorty;
    project.manager = this.selectedManager._id;
    project.startDate = this._dateParser.format(this.startDate);
    project.endDate = this._dateParser.format(this.endDate);
    projectForm.reset();
    if (this.buttonValue === 'Add') {
      this.service.addProject(project).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {    
            this.spinner = false;
            this.getProject();
            this.resetModel();
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
      project._id = this.editId;
      this.service.updateProject(project).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {    
              this.buttonValue = 'Add';
              this.getProject();
              this.resetModel();
              this.spinner = false;
          } else {
            this.spinner = false;
            this.errorMessage = 'Failed: ' + res.message;
          }
        }, (error) => {
          this.spinner = false;
          this.errorMessage = 'We are having some technical error, please try after sometime to update this user...!!!';
        }
      )
    }
  }

/**
 * This method should call to get the existing project informations
 */
  getProject() {
    this.spinner = true;
    this.service.getProject().subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          this.projectInformation = res.data;
          this.projectCountCheck(this.projectInformation);
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
 * This method should check the existing project informations
 * @param data : Esiting Project informations
 */
  projectCountCheck(data) {
    if (data.length > 0) {
      this.projectAvailable = true;
    } else {
      this.projectAvailable = false;
    }
  }

/**
 * This method should to reset the model values
 */
  resetModel() {
    this.projectDetails = new ProjectDetailsModel();
  }

/**
 * This method should call when we click Suspend button to edit the project information
 * @param project : project form informations
 */
  updateProject(project) {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.editId = project._id;
    this.buttonValue = 'Update';
    this.managerDisabledBtn = false;
    this.setProjectInfo(project);
  }

/**
 * This method should call when updateProject method calls to the project informations to update it in modal
 * @param projectInfo : project form informations
 */
  setProjectInfo(projectInfo) {
    this.projectDetails.projectName = projectInfo.projectName;
    this.projectDetails.startDate = projectInfo.startDate;
    this.projectDetails.endDate = projectInfo.endDate;
    this.priorty = projectInfo.priorty;
    this.managerName.filter(item => {
      if (item._id === projectInfo.manager) {
        this.projectDetails.manager = item.name;
        this.selectedManager = item._id;
      }
    });
    this.setStartEndDate = true;
  }

/**
 * This method should call when click reset button to reset the form values
 */
  resetForm() {
    this.managerDisabledBtn = true;
    if (this.buttonValue === 'Update') {
      this.buttonValue = 'Add';
    }
  }

/**
 * This method should call when shorting buttons based on sort value
 * @param project : sort value
 */
  sortProject(project: string) {
    this.path = project.split('.');
    this.sortOrder = this.sortOrder * (-1);
    return false;
  }

/**
 * This method should call to get the task informations to check the No of Tasks and Completed task informations to assign it corresponding project
 */
  getTask() {
    this.spinner = true;
    this.service.getTask().subscribe(
      (res: any) => {
        if(res.success && res.success !== false) {
          this.spinner = false;
          this.taskData = res.data;
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
 * This method should call when click delete button in delete modal box
 * @param project : delete project informations
 */
  deleteProject(project) {
    this.spinner = true;
    let deleteProjectList: any = [];
    if (this.taskData.length > 1) {
      this.taskData.filter(item => {
        if (project._id === item.project) {
          deleteProjectList.push(item.project);
        }
      });
    } else {
      deleteProjectList.push(project);
    }
    this.service.deleteProject(deleteProjectList).subscribe(
      (res: any) => {
        if (res.success && res.success !== false) {
          this.getProject();
          this.spinner = false;
        } else {
          this.spinner = false;
          this.errorMessage = 'Failed' + res.message;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to delete this project...!!!';
      }
    )
  }
}
