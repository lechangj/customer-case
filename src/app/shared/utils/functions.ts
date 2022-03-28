
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, MonoTypeOperatorFunction, timer } from 'rxjs';
import { delay, delayWhen, retryWhen, scan, tap } from 'rxjs/operators';

export function retryWithDelay<T>(delayTime: number = 2000, count = 3): MonoTypeOperatorFunction<T> {
    return (input) =>
      input.pipe(
        retryWhen((errors) =>
          errors.pipe(
            scan((acc, error) => ({ count: acc.count + 1, error }), {
              count: 0,
              error: undefined as any,
            }),
            tap((current) => {
              if (current.count > count) {
                throw current.error;
              }
            }),
            delay(delayTime)
          )
        )
      );
  }

const validateAllFormFields = (formGroup: FormGroup) => {
  Object?.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control && control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    } else if (control && control instanceof FormGroup) {
      () => validateAllFormFields(control);
    }
  });
}

export default validateAllFormFields;