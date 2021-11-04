import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { BookComponent } from './book/book.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'admin/users', component: EmployeeComponent,canActivate:[AuthGaurdService] },
  { path: 'admin/add', component: AddEmployeeComponent,canActivate:[AuthGaurdService]},
  { path: 'admin/users/:id', component: ProfileComponent,canActivate:[AuthGaurdService]},

  { path: 'profile', component: UserprofileComponent,canActivate:[AuthGaurdService]},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },

  { path: 'book/:id', component: BookComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent,canActivate:[AuthGaurdService] },

  { path: 'about', component: AboutComponent},
  { path: 'help', component: HelpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
