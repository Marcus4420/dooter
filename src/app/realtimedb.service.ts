import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import { getDatabase, ref, set} from "firebase/database";
import {User} from "@angular/fire/auth";
import {onValue} from "@angular/fire/database";
import {AuthService} from "./auth.service";
import {getMessaging} from "@angular/fire/messaging";

@Injectable({
  providedIn: 'root'
})
export class RealtimedbService {
  private AuthService = inject(AuthService);
  private userId = this.AuthService.userSignal()?.uid
  private _userMessagesSignal: WritableSignal<[]> = signal([])
  private db = getDatabase();
  private _userMessageRef = ref(this.db, 'user/' + this.userId + '/message/');
  constructor() {
    this.messagesByUser();
    effect(() => {
      console.log("User message signal: ", this._userMessagesSignal());
    })
  }

  //Replace /users with a websocket room id or something
    writeUserData(userId: string, name: string | null, email: string | null, imageUrl: string | null, message: string) {
    const index = Math.floor((Math.random() * 10000) + 1);
      set(ref(this.db, 'user/' + this.userId + '/message/' + index), {
        username: name,
        email: email,
        profile_picture : imageUrl,
        message: message,
    });
  }

  messagesByUser() {
    onValue(this._userMessageRef, (snapshot) => {
      const data = snapshot.val();
      this._userMessagesSignal.set(data)
    });
    return
  }

  get userMessages() {
    return this._userMessagesSignal.asReadonly();
  }
}
