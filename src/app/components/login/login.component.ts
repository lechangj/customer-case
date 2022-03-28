import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, takeUntil, tap } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { Subject, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit, OnDestroy {

  notifier = new Subject<void>();
  submitted = false;
  returnUrl: string[] = [];
  
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['Password10', Validators.required]
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || ['case','list'];
    console.log("Return URL: ", this.returnUrl);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.selectRootElement('#userId').focus();
    }, 0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.accountService.login(this.f['userId'].value, this.f['password'].value)
      .pipe(
        first(),
        tap(data => this.router.navigate([...this.returnUrl])),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }),
        takeUntil(this.notifier)
      )
      .subscribe();
  }
  
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
