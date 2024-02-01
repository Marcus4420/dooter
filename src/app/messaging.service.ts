import {computed, effect, inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private _authService = inject(AuthService)
  private _supabaseClient = this._authService.supabaseClient;
  private _currentProfileID = computed(() => this._authService.currentProfile()?.id);
  constructor() {
    effect(() => {
      this.subscribeToMessagesReceivedToSpecificUser();
    })

  }

  async sendMessageToDB(message: string) {
    const { data, error } = await this._supabaseClient
        .from('messages')
        .insert([
          { sender_id: this._currentProfileID(), receiver_id: this._currentProfileID(), message: message, sent_at: new Date() },
        ])
        .select()
    if (data) {
      console.log("Data from send msg ", data);
    } else if (error) {
      console.log("Error from send msg ", error);
    }
  }

  subscribeToMessagesReceivedToSpecificUser() {
    const userID = this._currentProfileID();
    if (userID) {
      console.log("userID from sub ", userID)
      const channels = this._supabaseClient.channel('messages-db-changes')
          .on(
              'postgres_changes',
              { event: 'INSERT', schema: 'public', table: 'messages', filter: `receiver_id=eq.${userID}`},
              (payload) => {
                //TODO FETCH LAST 30 MESSAGES WITH THIS COMBINED KEY
                //TODO ADD CACHING OR SOMETHING SO WE DONT HAVE TO FETCH ALL THE TIME!
                const { receiver_id, sender_id } = payload.new
                console.log(receiver_id, sender_id);
                console.log('Change received!', payload)
              }
          )
          .subscribe()
    }

  }

}
