import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { UserComponent } from '../user/user.component';
import { ProjectComponent } from '../project/project.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';
import { SortByPipe } from '../pipe/sort.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { NgbDateFRParserFormatter } from '../ngb-date-for-parser-formatter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { FindTaskByIdPipe } from '../pipe/findTaskById.pipe';
import { FindNoOfTaskPipe } from '../pipe/findNoOfTasks.pipe';
import { RouterTestingModule  } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, FormsModule, NgbModule, Ng5SliderModule, RouterTestingModule ],
      declarations: [ HeaderComponent, UserComponent, ProjectComponent, AddTaskComponent, ViewTaskComponent, SortByPipe, FilterPipe, SpinnerComponent, DateFormatPipe,
        FindTaskByIdPipe, FindNoOfTaskPipe ],
      providers: [ RouterModule, NgbDateFRParserFormatter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
