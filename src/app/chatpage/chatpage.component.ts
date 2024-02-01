import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessagingService} from "../messaging.service";
import { FormBuilder } from '@angular/forms';
import {NgForOf} from "@angular/common";

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
  private messageService = inject(MessagingService)
  private formbuilder = inject(FormBuilder);
  public currentLoadedMessages = this.messageService.currentLoadedMessages;

  messageForm = this.formbuilder.group({
    message: ''
  });

  onSubmit() {
    if (this.messageForm.value.message) {
      this.messageService.sendMessageToDB(this.messageForm.value.message);
      this.messageForm.reset();
      return
    }
  }


}
