import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './shared/interceptors';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './services/authorization.guard';
import { NgxAllowDirective } from './components/ngx-allow.directive';
import { CaseComponent } from './components/case/case.component';
import { CaseDetailComponent } from './components/case-detail/case-detail.component';

export function createAdminOnlyGuard(accountService:AccountService, router:Router) {
  return new AuthorizationGuard(['ADMIN'], accountService, router);  
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CaseListComponent,
    NgxAllowDirective,
    CaseComponent,
    CaseDetailComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    ...httpInterceptorProviders,
    {
        provide: 'adminsOnlyGuard',
        useFactory: createAdminOnlyGuard,
        deps: [
          AccountService,
          Router
        ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
