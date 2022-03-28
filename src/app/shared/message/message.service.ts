import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<any>(null);
  constructor() { }
  sendMessage(message: string, type = 1) {
    this.messageSubject.next({text: message, type: type});
  }
  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
  clearMessage() {
    this.messageSubject.next(null);
  }
}
