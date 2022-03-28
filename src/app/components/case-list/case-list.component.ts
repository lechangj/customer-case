import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap, takeUntil, map, catchError, finalize, take } from 'rxjs/operators';
import { merge, fromEvent, Subject, Observable, of } from 'rxjs';
import { ICase } from '../../model';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<ICase>();

  casesSize!: number;

  selectedId!: number;

  displayedColumns = ['type', 'agent', 'description', 'allocatedTo', 'action', 'status', 'select'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild('input', { static: true }) input!: ElementRef;

  notifier = new Subject<void>();

  constructor(private caseService: CaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.caseService.findAllCases().pipe(
      tap(cases => {
        this.casesSize = cases.length;
        this.dataSource.data = cases;
        this.dataSource.sort = this.sort;
      }),
      catchError(() => of([])),
      takeUntil(this.notifier)
    ).subscribe();

    this.route.paramMap.pipe(
      tap(params => {
        let id = params.get('id');
        if(id) {
          this.selectedId = +id;
        }
      }),
      takeUntil(this.notifier)
    ).subscribe();


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDetailBtnClick(e:any) {
    console.log(e);
    this.router.navigate(['case', e.id]);
  }

  onCreate() {
    console.log("Add button is clicked.");
    this.router.navigate(['case']);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
