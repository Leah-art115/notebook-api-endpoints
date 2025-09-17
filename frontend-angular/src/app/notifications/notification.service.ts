import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from './notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = signal<Notification[]>([]);
  public readonly notifications = this._notifications.asReadonly();

  private counter = 0;

  show(message: string, type: NotificationType = 'info', timeout = 4000) {
    const id = ++this.counter;

    const newNotification: Notification = {
      id,
      message,
      type,
      timeout,
    };

    this._notifications.update((list) => [...list, newNotification]);

    // Auto-remove after timeout
    setTimeout(() => {
      this.dismiss(id);
    }, timeout);
  }

  dismiss(id: number) {
    this._notifications.update((list) => list.filter((n) => n.id !== id));
  }

  clearAll() {
    this._notifications.set([]);
  }
}
