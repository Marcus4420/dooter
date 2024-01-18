import {Component, inject} from '@angular/core';
import {collection, Firestore, getDocs, query} from "@angular/fire/firestore";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css'
})
export class ChatpageComponent {
  firestore = inject(Firestore);
  messages: any = [];

  async ngOnInit() {
    const q = query(collection(this.firestore, "FirestoreTest"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const message = doc.data();
      console.log(message);
      this.messages.push(message)
    })
  }
}
