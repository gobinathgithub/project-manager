import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { CommonService } from './common.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipe/filter.pipe';
import { SortByPipe } from './pipe/sort.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { NgbDateFRParserFormatter } from './ngb-date-for-parser-formatter';
import { SharedService } from '../service/shared.service';
import { FindTaskByIdPipe } from './pipe/findTaskById.pipe';
import { FindNoOfTaskPipe } from './pipe/findNoOfTasks.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    ProjectComponent,
    AddTaskComponent,
    ViewTaskComponent,
    FilterPipe,
    SortByPipe,
    SpinnerComponent,
    FindTaskByIdPipe,
    FindNoOfTaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [ CommonService, NgbActiveModal, DateFormatPipe, NgbDateFRParserFormatter, SharedService, FindTaskByIdPipe, FindNoOfTaskPipe ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
