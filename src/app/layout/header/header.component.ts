import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  username: string | null = ''
  constructor(private loginService: LoginService, private router: Router) { }
  logout() {
    this.loginService.logout()
  }
  ngOnInit() {
    this.username = this.loginService.getUserName()
  }
  loggedIn() {
    return this.loginService.isLoggedIn()
  }

}