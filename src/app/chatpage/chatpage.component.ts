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
  realtimeDB =  inject(RealtimedbService);
  authService = inject(AuthService);
  currentUser = this.authService.userSignal();
  allMessagesSignal = this.realtimeDB.userMessages;
  inputMessage = '';
  constructor() {

  }

  sendMessage() {
    if (this.currentUser) {
      this.realtimeDB.writeUserData(this.currentUser?.uid, this.currentUser?.displayName,this.currentUser?.email, this.currentUser?.photoURL, this.inputMessage);
    } else {
      console.log("A current user has not been authenticated. Current user: " + this.currentUser);
    }
  }
}
