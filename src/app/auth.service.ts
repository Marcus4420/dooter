import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {createClient, SupabaseClient, User} from "@supabase/supabase-js";
import {environment} from "../environments/environment.development";

export interface Profile {
    full_name: string
    email: string
    avatar_url: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient
  private _currentUserFromSession: WritableSignal<User|null> = signal(null);
  private _currentProfile: WritableSignal<Profile | null> = signal(null);

  constructor() {
    this.supabase = createClient(environment.supabaseURL, environment.supabaseKEY);
    this.supabase.auth.onAuthStateChange((event,session) => {
      console.log('auth changed: ', event);
      console.longg('auth changed session: ', session)
      if(session) {
        this._currentUserFromSession.set(session.user);
      } else {
        this._currentUserFromSession.set(null);
      }

    })

    effect(() => {
        this.userProfile(this._currentUserFromSession()).then((profile) => {
          this._currentProfile.set(profile.data);
        })
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
    userProfile(user: User | null) {
      return this.supabase.from('profiles')
          .select('full_name, avatar_url, email')
          .eq('id', user?.id)
          .single()
    }


  get currentUserFromSession() {
    return this._currentUserFromSession.asReadonly();
  }

  get currentProfile() {
    return this._currentProfile;
  }

}
