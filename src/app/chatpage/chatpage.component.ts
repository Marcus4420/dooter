import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MessagingService} from "../messaging.service";

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css'
})
export class ChatpageComponent {
  public messageInput: WritableSignal<string> = signal('');
  private messageService = inject(MessagingService)


  onSubmit() {
    this.sendMessageToDB();
  }

    public sendMessageToDB() {
      this.messageService.sendMessageToDB()
    }
}
