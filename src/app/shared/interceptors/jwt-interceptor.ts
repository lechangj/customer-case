import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';
import { AccountService } from "../../services/account.service";
import { TOKEN_HEADER_KEY } from '../utils';
import { IUser } from '../../model';



@Injectable()
export class JwtInterceptor implements HttpInterceptor  {

    constructor(private accountService: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }
        const user = this.accountService.getUser();
        if (user && user.token) {
            req = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${user.token}`)
            });

            // this.logger.setCustomHttpHeaders(new HttpHeaders({ "Authorization": `Bearer ${user.token}` }));
        }

        return next.handle(req);
    }

}