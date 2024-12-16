import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from './services/validate.service';
import {DataService} from './services/data.service';
import {DatadisplayService} from './services/datadisplay.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from "angular2-flash-messages";
import {AuthGuard} from './guards/auth.guard';
import { IncomeComponent } from './components/income/income.component';
import { ChartsModule } from 'ng2-charts';
import { SummaryComponent } from './components/summary/summary.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';
import { ChartComponent } from './components/chart/chart.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'addRecord', component: IncomeComponent,canActivate:[AuthGuard]},
  {path:'editRecord/:id', component:  RecordDetailComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    IncomeComponent,
    SummaryComponent,
    RecordDetailComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [ValidateService,AuthService,AuthGuard, DataService, DatadisplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
