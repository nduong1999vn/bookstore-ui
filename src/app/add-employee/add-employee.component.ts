import { Component, OnInit } from "@angular/core";
import { HttpClientService, User, Role } from "../service/httpclient.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent implements OnInit {
  role: Role = new Role(0, "","");
  user: User = new User(0, "", "", this.role);

  constructor(private httpClientService: HttpClientService,
    private router: Router) {}

  ngOnInit() {}

  createEmployee(): void {
    console.log(this.user);
    this.httpClientService.createEmployee(this.user).subscribe(data => {
      alert("Employee created successfully.");
      this.router.navigate(['admin/users'])
    });
  }
}
