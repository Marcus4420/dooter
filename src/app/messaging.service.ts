import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {AuthService} from "./auth.service";
import {data} from "autoprefixer";

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  sent_at: Date
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private _authService = inject(AuthService)
  private _supabaseClient = this._authService.supabaseClient;
  private _currentProfileID = computed(() => this._authService.currentProfile()?.id);
  private _loadedMessages: WritableSignal<Message[] | null> = signal(null)
  constructor() {
    effect(() => {
      if (this._currentProfileID()) {
        this.subscribeToMessagesReceivedToSpecificUser();
        this.loadMessagesBetweenUsers(this._currentProfileID());
      }

    })
    effect(() => {
      console.log("Messages: ", this._loadedMessages());
    })

  }

  async sendMessageToDB(message: string) {
    const { data, error } = await this._supabaseClient
        .from('messages')
        .insert([
          { sender_id: this._currentProfileID(), receiver_id: '2bf9356c-f685-4dca-bfb1-9966752d0149', message: message, sent_at: new Date() },
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
                this.loadMessagesBetweenUsers(receiver_id);
                console.log(receiver_id, sender_id);
                console.log('Change received!', payload)
              }
          )
          .subscribe()
    }

  }

  async loadMessagesBetweenUsers(receiver: string | undefined) {
    const { data: messages, error } = await this._supabaseClient
        .from('messages')
        .select('*').eq('receiver_id', receiver)
        .order('sent_at', { ascending: false })
        .range(0,9)
    this._loadedMessages.set(messages);
  }


  get currentLoadedMessages() {
    return this._loadedMessages.asReadonly();
  }
}
