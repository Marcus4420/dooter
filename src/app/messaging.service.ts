import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {AuthService} from "./auth.service";

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  message: string
  sent_at: Date
}

export interface Conversation {
    id: string
    user_1: string
    user_2: string
    started_at: Date
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private _authService = inject(AuthService)
  private _supabaseClient = this._authService.supabaseClient;
  private _currentProfileID = computed(() => this._authService.currentProfile()?.id);
  private _conversation: WritableSignal<Message[]|null> = signal(null);
  private _loadedMessages: WritableSignal<Message[] | null> = signal(null)
  constructor() {
    this.loadConversationBetweenUsers();
    effect(() => {
      if (this._currentProfileID()) {
        console.warn("SUBSCRIBED", this._currentProfileID())
        this.subscribeToMessagesReceivedToSpecificUser();
        // this.loadMessagesByConversationID();
      }

    })
    effect(() => {
      console.log("Messages: ", this._loadedMessages());
    })
      effect(() => console.log("Conversation effect ", this._conversation()))

  }

  async SendMessageToUser(message: string, receiverID: string) {
    const { data, error } = await this._supabaseClient
        .from('messages')
        .insert([
          { conversation_id: '50e6445d-18c1-4901-92de-4aef819c9179',sender_id: this._currentProfileID(), receiver_id: receiverID, message: message, sent_at: new Date() },
        ])
        .select()
    if (data) {
      console.log("Data from send msg ", data);
    } else if (error) {
      console.log("Error from send msg ", error);
    }
  }

  subscribeToMessagesReceivedToSpecificUser() {
    const currid = this._currentProfileID()
      const channels = this._supabaseClient.channel('messages-db-changes')
          .on(
              'postgres_changes',
              { event: 'INSERT', schema: 'public', table: 'messages', filter: `sender_id=eq.${currid}`},
              (payload) => {
                //TODO FETCH LAST 30 MESSAGES WITH THIS COMBINED KEY
                //TODO ADD CACHING OR SOMETHING SO WE DONT HAVE TO FETCH ALL THE TIME!
                const { receiver_id, sender_id } = payload.new
                this.loadConversationBetweenUsers();
                console.log(receiver_id, sender_id);
                console.log('Change received!', payload)
              }
          )
          .subscribe()
  }

  async loadMessagesByConversationID() {
    const { data: messages, error } = await this._supabaseClient
        .from('messages')
        .select('*').eq('conversation_id', '50e6445d-18c1-4901-92de-4aef819c9179')
        .order('sent_at', { ascending: false })
        .range(0,9)
    this._loadedMessages.set(messages);
  }

  //TODO user sender and receiver from here
  async loadConversationBetweenUsers() {
    const { data: messages, error } = await this._supabaseClient
        .from('messages')
        .select('*')
        .eq('conversation_id','50e6445d-18c1-4901-92de-4aef819c9179')
        .order('sent_at', {ascending: false})
        .range(0,9);
    this._conversation.set(messages)
  }


  get currentLoadedConversation() {
    return this._conversation.asReadonly();
  }

  // get currentConversationID() {
  //   return this._conversation.asReadonly();
  // }
}
