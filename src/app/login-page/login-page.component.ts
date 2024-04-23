import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoginMode: boolean = true;
  errorMessage: string = '';
  newUsername: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  showPasswordError: boolean = false;
  constructor(private loginService: LoginService) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = ''; // Reset error message when mode changes
  }



  login() {
    // Login logic here
    this.loginService.login(this.username, this.password).subscribe(() => {
    })
  }

  register() {
    this.showPasswordError = false
    if (this.newPassword != this.confirmNewPassword) this.showPasswordError = true
    else {
      try {
        this.loginService.register(this.newUsername, this.newPassword).subscribe(() => {

        })
      } catch (err) {
        console.log(err)
      }

    }

  }
  public handleValue(prop: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    (this as any)[prop] = inputElement.value;
  }


}