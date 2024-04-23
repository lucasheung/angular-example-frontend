import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import the tap operator
import { ApiService } from './api.service';
import { Options } from '../../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiService: ApiService, private router: Router) { }
  private readonly loggedInKey = 'loggedIn';
  private readonly username = 'username'
  setUserName(username: string) {
    sessionStorage.setItem(this.username, username);
  }
  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/api/login/login'; // Replace 'your-api-url' with your actual API endpoint
    const body = { username, password };
    const options: Options = {
      responseType: 'text' as 'json'
    };
    return this.apiService.post<any>(url, body, options).pipe(
      tap((data) => {
        // Redirect to the desired page after successful login
        sessionStorage.setItem(this.loggedInKey, 'true');
        this.setUserName(username)
        this.router.navigate(['/home']);
      })
    );

  }


  register(username: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/api/login/register'; // Replace 'your-api-url' with your actual API endpoint
    const body = { username, password };
    const options: Options = {
      responseType: 'text' as 'json'
    };// You can pass any options if needed, such as headers      
    return this.apiService.post<any>(url, body, options).pipe(
      tap((data) => {
        // Redirect to the desired page after successful registration
        sessionStorage.setItem(this.loggedInKey, 'true');
        this.setUserName(username)
        this.router.navigate(['/home']);
      })
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.loggedInKey) === 'true';
  }

  logout() {
    // Perform logout actions
    sessionStorage.removeItem(this.loggedInKey);
    sessionStorage.removeItem(this.username)
    this.router.navigate(['/'])
  }

  getUserName() {
    return sessionStorage.getItem(this.username)
  }

}
