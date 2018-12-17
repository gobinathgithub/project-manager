import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsModel } from '../../model/task';
import { NgbDate, NgbCalendar, NgbModal, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../ngb-date-for-parser-formatter';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { Options } from 'ng5-slider';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { SharedService } from '../../service/shared.service';
import { HttpModule, Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { Ng5SliderModule } from 'ng5-slider';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule  } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { taskInfo } from '../unit-test/mock-request/addTaskRequest';

describe('AddTaskComponent', () => {
  let specObj: any = {};
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule,Ng5SliderModule, NgbModule, HttpClientModule, RouterTestingModule ],
      declarations: [ AddTaskComponent, SpinnerComponent ],
      providers: [CommonService, SharedService, DateFormatPipe, NgbDateFRParserFormatter, MockBackend, BaseRequestOptions, NgbModal, 
        {
          provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.taskDetails = taskInfo.data;
    specObj.fixture = TestBed.createComponent(AddTaskComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('project name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.project).toBeTruthy();
  });

  it('task name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.task).toBeTruthy();
  });

  it('priorty should be greater than 0', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.priorty).toBeGreaterThan(0);
  });

  it('priorty should be less than or equal to 30', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.priorty).toBeLessThanOrEqual(30);
  });

  it('start date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.startDate).toBeTruthy();
  });

  it('end date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.endDate).toBeTruthy();
  });

  it('user should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.taskDetails.user).toBeTruthy();
  });
});
