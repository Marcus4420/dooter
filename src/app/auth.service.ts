import {
    effect,
    Injectable,
    signal,
    WritableSignal
} from '@angular/core';
import {
  Auth,
  signInWithPopup,
  User,
  GoogleAuthProvider,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userSignal: WritableSignal<User|null> = signal(this.auth.currentUser);
  private authObserver = this.auth.onAuthStateChanged((user) => this._userSignal.set(user));
  private provider = new GoogleAuthProvider();

  constructor(private auth: Auth) {

    effect(() => {
        console.log(`The current user is: ${this._userSignal()}`);
    });
  }

  async SignIn() {
    // this.auth.setPersistence(browserLocalPersistence);
    const result = await signInWithPopup(this.auth, this.provider);
// The signed-in user info.
    const user = result.user;
// This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log(user)
    this._userSignal.set(user);
  }

  async SignOut() {
    this._userSignal.set(null);
    await signOut(this.auth);
    return
  }
  get userSignal() {
    return this._userSignal.asReadonly();
  }

  get userAuthAdmin() {
    return this._userSignal;
  }
}
