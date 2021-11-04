import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, HttpClientService } from '../service/httpclient.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public book: Book;
  public id: string;
  bookURL = environment.bookURL;
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
        comment: ['']
      })
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpClientService
    .getBookById(this.id)
    .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {  
    this.book = response;
  }

  submitForm(): void {
    var formData: any = new FormData();
    formData.append("comment", this.form.get('comment').value);
    this.httpClientService
    .postComment(formData, this.id)
    .subscribe(response => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/book', this.id]);
    });
  }

  deleteComment(id, user): void {
    this.httpClientService
    .deleteComment(id, user)
    .subscribe(response => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/book', this.id]);
    });
  }

  isCommentAuthor(usrname) {
    let user = sessionStorage.getItem("username");
    return (user == usrname)
  }
}
