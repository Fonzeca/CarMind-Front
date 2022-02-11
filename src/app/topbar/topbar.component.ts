import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  nombre! :string

  ngOnInit(): void {
    this.auth.getLoggedUser().subscribe((data) => {
      this.nombre = data.nombre;
    })
  }

}
