import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {
  Auth,
  signInWithPopup,
  User,
  GoogleAuthProvider,
  signInWithRedirect,
  browserSessionPersistence, getRedirectResult,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userSignal: WritableSignal<User|null> = signal(null);
  // public userSignal = this._userSignal.asReadonly();
  provider = new GoogleAuthProvider();
  constructor(private auth: Auth) {
    // this.auth.setPersistence(browserSessionPersistence);
    // if(auth) {
    //   this._userSignal.set(auth.currentUser)
    //   console.log(auth.currentUser, this.userSignal());
    // }
    effect(() => {
      console.log(`The current user is: ${this._userSignal()}`);
    });
  }

  async SignIn() {
    const result = await signInWithPopup(this.auth, this.provider);
// The signed-in user info.
    const user = result.user;
// This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log(user)
    this._userSignal.set(user);
  }

  get userSignal() {
    return this._userSignal.asReadonly();
  }
}
