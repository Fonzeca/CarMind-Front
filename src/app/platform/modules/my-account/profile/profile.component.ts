import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { user } from 'src/app/platform/interfaces/user';
import { AuthService } from 'src/app/platform/services/auth.service';
import * as $ from 'jquery';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent extends BaseComponent implements OnInit {

  user!: user;

  editing_id = '';

  @ViewChild('editing') input!: ElementRef;

  constructor(public auth: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.addSafeSubscription(
      this.auth.getLoggedUser$.subscribe((res: user) => this.user = res)
    );
  }

  edit(id: string, value: any) {
    this.editing_id = id;
    setTimeout(() => {
      this.input.nativeElement.value = value;
      this.input.nativeElement.focus();
    }, 0);
  }

  cancel(input: any) {
    const property = this.editing_id;
    const value = input.value;
    let data: any = {};
    data[property] = value;
    data['username'] = this.user.username;
    this.editing_id = '';
    this.auth.updateLoggedUser(data).subscribe((res) => {});
  }
}
