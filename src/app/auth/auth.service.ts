import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from './auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false
  isloading: boolean = false
  constructor(private router: Router, private http: HttpClient) { }

  private Admin = `http://localhost:3000/admin`
  private User = `http://localhost:3000/user`
  isPage: number = 0
  /// truy xuất admin
  getLoginAdmin(): Observable<LoginForm[]> {
    return this.http.get<LoginForm[]>(`${this.Admin}`)
  }
  /// truy xuất user
  getLoginUser(): Observable<LoginForm[]> {
    return this.http.get<LoginForm[]>(`${this.User}`)
  }
  ///chứa
  protected LoginUsers: LoginForm[] = []
  ///start login
  login(form: LoginForm, isPage: number) {
    ///User
    if (isPage == 0) {
      this.getLoginUser().subscribe((users: LoginForm[]) => {
        const user = users.find(u => u.email === form.email && u.password === form.password);
        if (user) {
          this.isAuthenticated = true;
          this.router.navigate(['']);
          alert('Login success');
          this.isPage = 0
        } else {
          alert('Login not successful');
          this.isAuthenticated = false;
        }
      });
    }
    ///admin
    else if (isPage == 1) {
      this.getLoginAdmin().subscribe((admins: LoginForm[]) => {
        const admin = admins.find(u => u.email === form.email && u.password === form.password);
        if (admin) {
          this.isAuthenticated = true;
          this.router.navigate(['list']);
          alert('Login success');
          this.isPage = 1
        } else {
          alert('Login not successful');
          this.isAuthenticated = false;
        }
      });
    }
  }
  register(form: RegisterForm, isPage: number) {
    if (form.password !== form.comfirm_password || form.email === '' || form.password === '' || form.comfirm_password === '') {
      alert('Hãy điền đầy đủ thông tin');
      return;
    }
    //User
    else if (isPage == 0) {
      this.getLoginUser().subscribe((users: any[]) => {
        const existingUser = users.find(u => u.email === form.email);
        if (existingUser) {
          alert('Email already exists');
        } else {
          this.http.post(this.User, form).subscribe(() => {
            this.router.navigate(['list']);
            this.isAuthenticated = true;
            alert('Register successful');
          });
        }
      }, error => {
        console.error('registration failed:', error);
      });
    }
    else if (isPage == 1) {
      this.getLoginAdmin().subscribe((admins: any[]) => {
        const existingAdmin = admins.find(u => u.email === form.email);
        if (existingAdmin) {
          alert('Email already exists');
        } else {
          this.http.post(this.Admin, form).subscribe(() => {
            this.router.navigate(['list']);
            this.isAuthenticated = true;
            alert('Register successful');
          });
        }
      }, error => {
        console.error('registration failed:', error);
      });
    }
  }
  logout() {
    this.router.navigate([''])
    this.isAuthenticated = false
  }
}