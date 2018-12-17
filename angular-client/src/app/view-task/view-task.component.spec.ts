import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../service/shared.service';
import { ViewTaskComponent } from './view-task.component';
import { CommonService } from '../common.service';
import { TaskDetailsModel } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { SortByPipe } from '../pipe/sort.pipe';
import { FindTaskByIdPipe } from '../pipe/findTaskById.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule  } from '@angular/router/testing';
import { getTask } from '../unit-test/mock-response/getTaskResponse';
import { Observable } from 'rxjs';
import { HttpModule, Http, ConnectionBackend, BaseRequestOptions} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('ViewTaskComponent', () => {
  let specObj: any = {};
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgbModule, HttpClientModule, RouterTestingModule ],
      declarations: [ ViewTaskComponent, SortByPipe, FindTaskByIdPipe, SpinnerComponent ],
      providers: [ CommonService, SharedService,
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
    specObj.task = getTask.data;
    specObj.fixture = TestBed.createComponent(ViewTaskComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('when click edit button, should navigate to edit task screen', () => {
    spyOn(specObj.component.router, 'navigateByUrl').and.returnValue(true);
    specObj.component.editTask(specObj.task[0]);
    expect(specObj.component.router.navigateByUrl).toHaveBeenCalledWith('/add-task');
  });
});
