/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils';
import { InitUserService } from './@theme/services/init-user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserStore } from './@core/stores/user.store';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private analytics: AnalyticsService,
    private initUserService: InitUserService, private userStore: UserStore
  ) {
    this.initUser();
  }

  ngOnInit(): void {
    var user = localStorage.getItem('user');
    if (user) {
      this.userStore.setUser(JSON.parse(user));
    }
    this.initUser();
    this.analytics.trackPageViews();
  }

  initUser() {
    this.initUserService.initCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
