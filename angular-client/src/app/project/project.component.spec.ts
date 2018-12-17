import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ProjectComponent } from './project.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { FilterPipe } from '../pipe/filter.pipe';
import { SortByPipe } from '../pipe/sort.pipe';
import { FindTaskByIdPipe } from '../pipe/findTaskById.pipe';
import { FindNoOfTaskPipe } from '../pipe/findNoOfTasks.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { projectInfo } from '../unit-test/mock-request/addProjectRequest';

describe('ProjectComponent', () => {
  let specObj: any = {};
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgbModule, Ng5SliderModule, HttpClientModule ],
      declarations: [ ProjectComponent, FilterPipe, SortByPipe, FindTaskByIdPipe, FindNoOfTaskPipe, SpinnerComponent ],
      providers: [NgbDateFRParserFormatter, CommonService, SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.project = projectInfo.data;
    specObj.fixture = TestBed.createComponent(ProjectComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('project name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.projectName).toBeTruthy();
  });

  it('priorty should be greater than 0', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.priorty).toBeGreaterThan(0);
  });

  it('priorty should be less than or equal to 30', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.priorty).toBeLessThanOrEqual(30);
  });

  it('start date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.startDate).toBeTruthy();
  });

  it('end date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.endDate).toBeTruthy();
  });

  it('manager should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-project')).nativeElement;
    addTaskButton.click();
    expect(specObj.project.manager).toBeTruthy();
  });
});
