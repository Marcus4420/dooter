import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {AuthService} from "./auth.service";
import { onAuthStateChanged, Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dooter';
  authservice = inject(AuthService);
  userSignalAdmin = this.authservice.userAuthAdmin;

  constructor(private auth: Auth) {
    auth.onAuthStateChanged((user) => {
      this.userSignalAdmin.set(user);
    })
  }
}
