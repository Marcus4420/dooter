import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {collection, Firestore, getDocs} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dooter';
  firestore = inject(Firestore);
  ngOnInit() {
    getDocs(collection(this.firestore, 'testPath')).then((response) => {
      console.log(response.docs)
    })
  }
}
