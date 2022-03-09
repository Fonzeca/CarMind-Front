import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService) {
    super();
   }

  nombre! :string

  ngOnInit(): void {
    this.addSafeSubscription(
      this.auth.getLoggedUser().subscribe((data) => {
        this.nombre = data.nombre;
      })
    );
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
