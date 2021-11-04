import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, HttpClientService } from '../service/httpclient.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[];
  bookURL = environment.bookURL;
  public form: FormGroup;
  
  keyword = ""
  
  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    public fb: FormBuilder,
    ) { 
      this.form = this.fb.group({
        keyword: ['']
      })
    }

  ngOnInit(): void {
    this.httpClientService
    .getAllBooks()
    .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {  
    this.books = response;
    console.log(response);
  }

  submitForm(): void {
    this.keyword = this.form.get('keyword').value
    console.log(this.keyword);
    this.router.navigate(['/search'], { queryParams: { keyword: this.keyword }});

  }
}
