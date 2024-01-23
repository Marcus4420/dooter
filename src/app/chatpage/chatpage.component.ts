import {Component, computed, effect, inject} from '@angular/core';
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
  currentUser = computed(() => this.authService.userSignal());
  allMessagesSignal = computed(() => this.realtimeDB.userMessages());
  inputMessage = '';
  constructor() {
    effect(() => {
        console.log("all messages in chatpage", this.allMessagesSignal())
    })

  }

  sendMessage() {
    if (this.currentUser()) {
      this.realtimeDB.writeUserMessage(this.currentUser()?.displayName,this.currentUser()?.email, this.currentUser()?.photoURL, this.inputMessage);
    } else {
      console.log("A current user has not been authenticated. Current user: " + this.currentUser);
    }
  }
}
