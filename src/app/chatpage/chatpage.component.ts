import {Component, inject} from '@angular/core';
import {RealtimedbService} from "../realtimedb.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css'
})
export class ChatpageComponent {
  RTdb =  inject(RealtimedbService);
  authService = inject(AuthService);
  currentUser = this.authService.userSignal();
  constructor() {

  }

  rtdbtest() {
    if (this.currentUser) {
      this.RTdb.writeUserData(this.currentUser?.uid, this.currentUser?.displayName,this.currentUser?.email, this.currentUser?.photoURL);
    } else {
      console.log("A current user has not been authenticated. Current user: " + this.currentUser);
    }
  }
}
