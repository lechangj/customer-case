import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.checkIfAuthenticated(state);
  }

  private checkIfAuthenticated(state: RouterStateSnapshot) {
      return this.accountService.isLoggedIn$
          .pipe(
              map(loggedIn =>
                loggedIn? true: this.router.parseUrl('login'))
          );
  }
  
}
