import { Component, Input, OnInit } from '@angular/core';
import { notifications } from '../../interfaces/notifications';

@Component({
  selector: 'm-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification!:notifications;

  constructor() { }

  ngOnInit(): void {
  }

}
