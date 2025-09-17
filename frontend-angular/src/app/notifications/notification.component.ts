
import { Component, effect } from '@angular/core';
import { NgFor } from '@angular/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications: () => Notification[];

  constructor(private notificationService: NotificationService) {
    this.notifications = this.notificationService.notifications;
    // Reactive effect to debug or hook if needed
    effect(() => {
      this.notifications();
    });
  }

  dismiss(id: number) {
    this.notificationService.dismiss(id);
  }
}
