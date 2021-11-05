import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, HttpClientService } from '../service/httpclient.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: Book[];
  bookURL = environment.bookURL;
  public form: FormGroup;
  keyword = ""
  
  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    ) { 
      this.form = this.fb.group({
        keyword: ['']
      })
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        console.log(params); 
        this.keyword = params['keyword'];
      }
    );
    this.httpClientService
    .getSearchBooks(this.keyword)
    .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {  
    this.books = response;
    console.log(response);
  }

  submitForm(): void {
    this.keyword = this.form.get('keyword').value
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/search'], { queryParams: { keyword: this.keyword }});

  }
}
