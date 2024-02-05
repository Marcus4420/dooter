import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Message, MessagingService} from "../messaging.service";
import { FormBuilder } from '@angular/forms';
import {NgForOf} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css'
})
export class ChatpageComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessagingService)
  private formbuilder = inject(FormBuilder);
  public currentLoadedMessages = this.messageService.currentLoadedConversation;
  public currentUser = this.authService.currentProfile;
  public recievers = this.messageService.receivers;
  messageForm = this.formbuilder.group({
    receiver: '',
    message: '',
  });


  //TODO add user experience when no message is input
  onSubmit() {
    if (this.messageForm.value.message && this.messageForm.value.receiver) {
      // console.log("onSubmit",this.messageForm.value.message,this.messageService.currentConversationID());
      console.log(this.messageForm.value.receiver)
      this.messageService.SendMessageToUser(this.messageForm.value.message, this.messageForm.value.receiver);
      this.messageForm.reset();
      return
    }
  }

  //TODO style based on screen size
  styleBySender(message: Message) {
    if (message.sender_id === this.authService.currentProfile()?.id) {
      return 'message-sent';
    } else if (message.receiver_id === this.authService.currentProfile()?.id){
      return 'message-received';
    } else {
      return 'bg-purple-100'
    }
  }


}
