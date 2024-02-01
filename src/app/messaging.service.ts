import {computed, effect, inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private _authService = inject(AuthService)
  private _supabaseClient = this._authService.supabaseClient;
  private _currentProfileInfo = this._authService.currentProfile;
  private _currentProfileID = computed(() => this._authService.currentProfile()?.id);
  constructor() {
    effect(() => {console.log("current user id ", this._currentProfileID())})
  }

  async sendMessageToDB(message: string) {
    const { data, error } = await this._supabaseClient
        .from('messages')
        .insert([
          { sender_id: this._currentProfileID(), receiver_id: this._currentProfileID(), message: message, sent_at: new Date() },
        ])
        .select()
    console.log("Data from send msg ", data);
    console.log("Error from send msg ", error);
  }

}
