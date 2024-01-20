import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from '@supabase/supabase-js'
import { environment } from "../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthService {
<<<<<<< Updated upstream
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
=======
    private supabase: SupabaseClient
    _session: AuthSession | null = null

    constructor() {
        this.supabase = createClient(environment.url, environment.key);
    }
>>>>>>> Stashed changes

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session
            console.log("Session req ", this._session);
        })
        console.log("Session req ", this._session);
        return this._session
    }

    // profile(user: User) {
    //     return this.supabase
    //         .from('profiles')
    //         .select(`username, website, avatar_url`)
    //         .eq('id', user.id)
    //         .single()
    // }

<<<<<<< Updated upstream
  get currentUser() {
    return this._currentUser.asReadonly();
  }
=======
    authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback)
    }

    // async signIn() {
    //     const { data, error } = await this.supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             queryParams: {
    //                 access_type: 'offline',
    //                 prompt: 'consent',
    //             },
    //         },
    //     })
    // }

    async signUp(Email: string, Password: string) {
        const { data, error } = await this.supabase.auth.signUp({
            email: Email,
            password: Password,
            options: {
                emailRedirectTo: 'localhost:4200'
            }
        })
    }

    signOut() {
        return this.supabase.auth.signOut()
    }
>>>>>>> Stashed changes
}

