import { Component, Input, OnInit } from '@angular/core';
import { HttpClientService, User } from "../service/httpclient.service";
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  backupName: String;
  invalidName = false;
  @Input() error: string | null;

  public user: User;
  public id: string;
  avatarURL = environment.avatarURL;
  
  public form: FormGroup;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute,
    public loginService:AuthenticationService,
    public fb: FormBuilder
    ) { 
      this.form = this.fb.group({
        username: [''],
        password: [''],
        role: ['']
      })
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpClientService
    .getMyProfile()
    .subscribe(response => {
      this.user = response;    
      this.form.patchValue({
        username: this.user.username,
        role: this.user.roles.name,
      });
    });
  }

  handleSuccessfulResponse(response) {  
    this.user = response;
    console.log(this.user)
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }
    var formData: any = new FormData();

    formData.append("username", this.user.username);
    formData.append("password", this.form.get('password').value);
    formData.append("role", this.form.get('role').value);
    console.log(this.form.get('password').value);
    this.httpClientService
    .updateUser(formData, this.user.id)
    .subscribe(response => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/profile']);
    });
  }

  backupSystem() {
    console.log(this.backupName);
    if (this.loginService.isUserAdmin()) {
      (this.httpClientService.backupSystem(this.backupName).subscribe(
        data => {
          alert("Backup successfully as " + this.backupName)
          this.router.navigate([''])
          this.invalidName = false
        },
        error => {
          this.invalidName = true
          this.error = error.message;
          if (error.status == 401) {
            this.error = "Unauthorized";
          }
        }
      )
      );
    }
  }
}

