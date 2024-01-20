import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import { SupabaseAuthService } from '../supabase-auth.service'
import {User} from "@supabase/supabase-js";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
<<<<<<< Updated upstream
  authStatus = false;
  supabaseAuth = inject(SupabaseAuthService);
  currentUser: User | undefined = this.supabaseAuth.currentUser();

  constructor() {
    console.log("User signal:", this.currentUser);
=======
  session = this.supabaseAuth.session;

  constructor(private supabaseAuth: SupabaseAuthService) {
>>>>>>> Stashed changes
  }

  signUp() {
    this.supabaseAuth.signUp('Marcusellested02@gmail.com', 'Test123');
  }
  Login() {
    //
  }
  signOut() {
    this.supabaseAuth.signOut();
  }
}
