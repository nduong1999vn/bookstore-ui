import { Component, OnInit } from "@angular/core";
import { HttpClientService, User } from "../service/httpclient.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  employees: User[];

  constructor(private httpClientService: HttpClientService,
    private router: Router) {}

  ngOnInit() {
    this.httpClientService
      .getEmployees()
      .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {  
    this.employees = response;
  }

  deleteEmployee(employee: User): void {
    if(confirm("Are you sure to delete "+ employee.username)) {
      this.httpClientService.deleteEmployee(employee).subscribe(data => {
        this.employees = this.employees.filter(u => u !== employee);
        
      });
    }
    alert("User deleted successfully.");
    this.ngOnInit();
  }
}
