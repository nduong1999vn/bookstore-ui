import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  
  @Input() error: string | null;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    console.log(this.username);
    (this.loginservice.register(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/login'])
      }
    )
    );

  }

}
