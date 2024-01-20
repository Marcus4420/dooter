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
  authStatus = false;
  supabaseAuth = inject(SupabaseAuthService);
  currentUser: User | undefined = this.supabaseAuth.currentUser();

  constructor() {
    console.log("User signal:", this.currentUser);
  }

  signIn() {
    this.supabaseAuth.signIn();
  }
  signOut() {
    this.supabaseAuth.signOut();
  }
}
