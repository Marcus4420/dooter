import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    authService = inject(AuthService)
    currentUser = this.authService.userSignal;
}
