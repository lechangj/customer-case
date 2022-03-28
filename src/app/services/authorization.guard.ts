import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {tap, first, map} from 'rxjs/operators';
import { AccountService } from './account.service';
import * as _ from 'lodash';

@Injectable()
export class AuthorizationGuard implements CanActivate {


  constructor(@Inject(String) private allowedRoles:string[],
              private accountService:AccountService, 
              private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>  {

      return this.accountService.user$.pipe(
        map(user => _.intersection(this.allowedRoles, user?.roles).length > 0),
        first(),
        tap(allowed => {
          if (!allowed) {
              this.router.navigateByUrl('/');
          }
        })
      );
  }
  
}
