import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './notes/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './notifications/notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,  HttpClientModule,   NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
