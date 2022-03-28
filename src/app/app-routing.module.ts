import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { AuthGuard } from './services/auth.guard';
import { CaseComponent } from './components/case/case.component';
import { CaseDetailComponent } from './components/case-detail/case-detail.component';

const appRoutes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'case/list', component: CaseListComponent, canActivate: [AuthGuard]  },
  { path: 'case', component: CaseComponent, canActivate: [AuthGuard, "adminsOnlyGuard"]  },
  { path: 'case/:id/edit', component: CaseComponent, canActivate: [AuthGuard, "adminsOnlyGuard"] },
  { path: 'case/:id', component: CaseDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
