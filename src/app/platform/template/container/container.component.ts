import { Component, OnInit } from '@angular/core';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'template-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class TemplateContainerComponent implements OnInit {

  constructor(private typeService:TypeService) {

   }

  ngOnInit(): void {
  }

}
