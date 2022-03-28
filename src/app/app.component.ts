import { Component } from '@angular/core';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { tap, takeUntil, delay, first, concatMap, map, filter, take } from 'rxjs/operators';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { AccountService } from './services/account.service';
import { ICompanyInfo, IUser } from './model';
import { HttpClient } from '@angular/common/http';
import { IMAGES_BASE, USER_DATA } from './shared/utils';
import ConfigJson from '../assets/config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customer-case';
  companyInfo$!: Observable<ICompanyInfo>;
  email$!: Observable<string>;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AccountService,
    private http: HttpClient) {

  }

  ngOnInit(): void {
    this.companyInfo$ = of({
      logoUrl: IMAGES_BASE +  ConfigJson.companyLogo,
      phone:  ConfigJson.phone,
      title:  ConfigJson.title
    });

    this.email$ = this.auth.user$.pipe(
      map(user => user ? user.email : "")
    );

    this.isLoggedIn$ = this.auth.isLoggedIn$;

  }

  home() {
    this.router.navigate(['case', 'list']);
  }

  logout() {
    this.auth.logout();
  }

}
