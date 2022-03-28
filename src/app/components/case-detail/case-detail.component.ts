import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICase } from '../../model';
import {  } from '../../shared/utils';
import { Observable, Subject, of, merge, throwError } from 'rxjs';
import { catchError, filter, first, mergeMap, take, takeUntil, tap, map } from 'rxjs/operators';
import { CaseService } from '../../services/case.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MessageBox } from '../../shared/message/message-box';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit, OnDestroy {

  notifier = new Subject<void>();
  caseNo!: number;
  // caseInstance!: ICase;
  caseInstance$!: Observable<ICase>;  

  constructor(
    private caseService: CaseService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap((params : ParamMap) => {
        console.log(params);
        let id = params.get('id');
        if(id) {
          this.caseNo = +id;
        }
        this.caseInstance$ = this.caseService.findCaseById(this.caseNo).pipe(
          take(1),
        );
     }),
      takeUntil(this.notifier)
    ).subscribe();
  }

  editCase() {
    // console.log("Edit btn is clicked.");
    this.router.navigate(['case', this.caseNo, 'edit']);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
