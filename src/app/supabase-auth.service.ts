import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {AuthSession, createClient, AuthChangeEvent, Session, SupabaseClient, User} from "@supabase/supabase-js";
import { environment } from "../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthService {
  private supabase: SupabaseClient
  private _currentUser: WritableSignal<User | undefined> = signal(undefined);
  constructor() {
    this.supabase = createClient(environment.url, environment.key);
    console.log("Supabase instance: " + this.supabase);
    const user = this.supabase.auth.getUser().then((user) => {
      //Find en måde at gøre user til samme type som User !?
      console.log(user)
    })
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);
      if (event ==='SIGNED_IN') {
        this._currentUser.set(session?.user);
        console.log("User metadata ", session?.user);
      } else {
        this._currentUser.set(undefined);
      }
    })
  }


  async signIn() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }
  async signOut() {
    const { error } = await this.supabase.auth.signOut()
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }
}

