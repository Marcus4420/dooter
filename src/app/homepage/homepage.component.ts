import {Component, effect, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  private auth = inject(AuthService)
  public currentUserFromSession  = this.auth.currentUserFromSession;
  public currentProfileInfo = this.auth.currentProfile;

  constructor() {
    effect(() => {
      console.log("current user from session", this.currentUserFromSession());
      console.log("current profile Info ", this.currentProfileInfo());
    })
  }
  doSignIn() {
    this.auth.signIn();
  }

  doSignOut() {
    this.auth.signOut();
  }
}
