import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

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
  public authStatus: Boolean = false;
  public user: string = "John doe";
  public changeAuth(): void {
    this.authStatus = !this.authStatus;
  }
}
