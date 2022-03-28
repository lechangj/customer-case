import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, pipe, merge, of, throwError } from 'rxjs';
import { catchError, debounceTime, finalize, first, take, takeUntil, tap } from 'rxjs/operators';
import { CaseService } from '../../services/case.service';
import { ICase, ReferenceValue } from '../../model';
import validateAllFormFields from '../../shared/utils/functions';
import { MatDialog } from '@angular/material/dialog';
import { MessageBox } from '../../shared/message/message-box';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit, OnDestroy {

  notifier = new Subject<void>();

  id!: number;
  isEditMode!: boolean;
  caseInstance!: ICase;

  caseForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private caseService: CaseService,
    private fb: FormBuilder,
    private dialog: MatDialog,) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;
    console.log("This is edit mode? ", this.isEditMode);

    this.caseForm = this.initCase();

    if (this.isEditMode) {
      this.caseService.findCaseById(this.id).pipe(
        take(1),
        tap(caseInstance => this.fillValue(caseInstance)),
        takeUntil(this.notifier)
      ).subscribe();
    } 

    this.caseForm.controls['allocatedTo'].valueChanges.pipe(
      debounceTime(400),
      tap(val =>  {
        if(val.trim().length > 0)
          this.caseForm.get('status')?.setValue("Investigation");
        else
        this.caseForm.get('status')?.setValue("Open");
      }),
      takeUntil(this.notifier)
    ).subscribe();

    this.caseForm.controls['action'].valueChanges.pipe(
      debounceTime(400),
      tap(val => {
        if(val.trim().length > 0) {
          this.caseForm.get('status')?.setValue("Resolved");
          this.caseForm.get('respondedAt')?.setValue(new Date().toLocaleString('ca'));
        }
        else {
          this.caseForm.get('status')?.setValue("Investigation");
          this.caseForm.get('starespondedAttus')?.setValue("");
        }
      }),
      takeUntil(this.notifier)
    ).subscribe();
  }

  saveCase() {
    if (this.caseForm.invalid) {
      validateAllFormFields(this.caseForm);
      console.log('form is invalid');   
      MessageBox.show(this.dialog, "Could you check the form fields? \nThere seems to be at least a field to be filled.").pipe(
        takeUntil(this.notifier)).subscribe();
    }
    let caseInstance!:ICase;
    if (this.isEditMode) {
      caseInstance = {...this.caseForm.value, id: this.id};
    } else {
      caseInstance = {...this.caseForm.value};
    }
    console.log(caseInstance);
    this.caseService.saveCase(caseInstance).pipe(
      first(),
      tap(data => this.router.navigate(['case', data.id])),
      catchError(err => {
        console.log(err);
        MessageBox.show(this.dialog, "The save process has failed.").pipe(takeUntil(this.notifier)).subscribe();
        return throwError(() => new Error(err));
      }),
      takeUntil(this.notifier)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  fillValue(caseInstance: ICase) {
    console.log("Before filling: ", JSON.stringify(caseInstance));
    this.caseInstance = caseInstance;
    this.caseForm.patchValue({        
      ...caseInstance,
      type: caseInstance.type,
      agent: caseInstance.agent,
      createdAt: caseInstance.createdAt,
      description: caseInstance.description,
      allocatedTo: caseInstance.allocatedTo,
      action: caseInstance.action,
      respondedAt: caseInstance.respondedAt,
      status: caseInstance.status,
      feedback: caseInstance.feedback
    });
  }
  
  initCase(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      agent: ['', Validators.required],
      createdAt: [new Date().toLocaleString('ca')],
      description: [''],
      allocatedTo: [''],
      action: [''],
      respondedAt: [''],
      status: ['Open'],
      feedback: ['']
    });
  }

  types: ReferenceValue[] = [
    {code: 'Billing', value: 'Billing'},    
    {code: 'Complaint', value: 'Complaint'},
    {code: 'Fraud', value: 'Fraud'}
  ]

  agents: ReferenceValue[] = [
    {code: '019', value: 'Jane'},    
    {code: '020', value: 'Jone'},
    {code: '021', value: 'Thomas'},
    {code: '023', value: 'Bill'},
    {code: '027', value: 'Anold'},
    {code: '031', value: 'Ted'}
  ]

}
