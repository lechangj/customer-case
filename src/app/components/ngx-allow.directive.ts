import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import {Subscription} from "rxjs";
import * as _ from 'lodash';
import { IUser } from '../model';
import { AccountService } from '../services/account.service';

@Directive({
  selector: '[ngxAllow]'
})
export class NgxAllowDirective implements OnDestroy {

  allowedRoles!:string[];
  user!: IUser;

  sub:Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private accountService: AccountService) {
      this.sub = accountService.user$.subscribe(
        user => {
          if(user)
            this.user = user;
          this.showIfUserAllowed();
        }
      );
    }

    @Input()
    set ngxAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 ||
            !this.user) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed =
            _.intersection(this.allowedRoles, this.user.roles).length > 0;


        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
