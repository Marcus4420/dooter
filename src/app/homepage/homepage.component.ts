import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  authService = inject(AuthService)
  currentUser = this.authService.userSignal;
  constructor() {
  }
  SignIn() {
    this.authService.SignIn();
  }
  SignOut() {
    this.authService.SignOut();
  }
}
