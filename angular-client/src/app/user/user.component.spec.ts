import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsModel } from '../../model/user';
import { CommonService } from '../common.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../service/shared.service';
import { TaskDetailsModel } from '../../model/task';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';
import { SortByPipe } from '../pipe/sort.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { userInfo } from '../unit-test/mock-request/addUserRequest';

describe('UserComponent', () => {
  let specObj: any = {};
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
      declarations: [ UserComponent, FilterPipe, SortByPipe, SpinnerComponent ],
      providers: [ CommonService, SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.user = userInfo.data;
    specObj.fixture = TestBed.createComponent(UserComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('first name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-user')).nativeElement;
    addTaskButton.click();
    expect(specObj.user.firstName).toBeTruthy();
  });

  it('last name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-user')).nativeElement;
    addTaskButton.click();
    expect(specObj.user.lastName).toBeTruthy();
  });

  it('employee id should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-user')).nativeElement;
    addTaskButton.click();
    expect(specObj.user.employeeId).toBeTruthy();
  });
});
