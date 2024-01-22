import {Component, computed, inject} from '@angular/core';
import {RealtimedbService} from "../realtimedb.service";
import {AuthService} from "../auth.service";
import { FormsModule } from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css'
})
export class ChatpageComponent {
  RTdb =  inject(RealtimedbService);
  authService = inject(AuthService);
  currentUser = this.authService.userSignal();
  allMessagesSignal = this.RTdb.messages;
  message = '';
  constructor() {

  }

  rtdbtest() {
    if (this.currentUser) {
      this.RTdb.writeUserData(this.currentUser?.uid, this.currentUser?.displayName,this.currentUser?.email, this.currentUser?.photoURL, this.message);
    } else {
      console.log("A current user has not been authenticated. Current user: " + this.currentUser);
    }
  }
}
