import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'observable-start';
  userActive: boolean = false;

  userSubscribe: Subscription = new Subscription();

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userSubscribe = this.userService.activateUser.subscribe(
      (isActivate: boolean) => {
        this.userActive = isActivate;
      }
    );
  }
  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }
}
