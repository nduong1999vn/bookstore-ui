import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class User {
  constructor(
    public id : number,
    public username: string,
    public password: string,
    public roles: Role,
  ) {}
}

export class Role {
  constructor(
    public id : number,
    public name: string,
    public description: string,
  ) {}
}

export class Book {
  constructor(
    public id : number,
    public title: string,
    public price: number,
    public description: string,
    public image: string,
    public comments: Comment
  ) {}
}

export class Comment {
  constructor(
    public id : number,
    public comment: string,
    public user: User,
    public book: Book,
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get<User[]>("http://localhost:8080/user/");
  }

  getMyProfile() {
    return this.httpClient.get<User>("http://localhost:8080/pingmyself/");
  }

  getUserById(id) {
    return this.httpClient.get<User>("http://localhost:8080/user/" + id);
  }

  updateUser(formData, id) {
    return this.httpClient.put<User>("http://localhost:8080/user/edit/" + id, formData);
  }

  handleSuccessfulResponse(response: User[]): void {
    throw new Error("Method not implemented.");
  }

  getAllBooks() {
    return this.httpClient.get<Book[]>("http://localhost:8080/books/");
  }  
  
  getSearchBooks(keyword) {
    return this.httpClient.get<Book[]>("http://localhost:8080/books/search?title=" + keyword);
  }

  getBookById(id) {
    return this.httpClient.get<Book>("http://localhost:8080/books" + "/" + id);
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<User>(
      "http://localhost:8080/user" + "/" + employee.id
    );
  }

  public deleteComment(id, user) {
    return this.httpClient.delete<Comment>(
      "http://localhost:8080/books/comment/" + id + "/" + user
    );
  }

  postComment(formData, id) {
    return this.httpClient.post<Comment>(
      "http://localhost:8080/books/" + id + "/comment", formData
    );
  }

  public createEmployee(employee) {
    return this.httpClient.post<User>(
      "http://localhost:8080/user/add",
      employee
    );
  }
}
