import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
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
  private userIdSignal = computed(() => this.AuthService.userSignal()?.uid);
  private _userMessagesSignal: WritableSignal<Object|null> = signal(null);
  private db = getDatabase();
  private _userMessageRef = ref(this.db, 'user/' + this.userIdSignal() + '/message/');
  constructor() {
    this.messagesByUser();
    effect(() => {
      console.log("User message signal: ", this._userMessagesSignal());
    })
  }

    //TODO: Replace /users with a websocket room id or something

    // TODO: Fix this hell of string | undefined | null thingy
    writeUserMessage(name: string | null | undefined, email: string | null | undefined, imageUrl: string | null | undefined, message: string) {
      set(this._userMessageRef, {
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
