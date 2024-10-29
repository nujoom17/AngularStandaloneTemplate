import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, retry, throwError, timer } from "rxjs";

enum HttpStatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    ServiceUnavailable = 503,
    Disconnected = 0,
}

const RETRY_TIMES = 2;
const DELAY = 2500;

export function errorInterceptor (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    return next(req).pipe(
        retry({
            count: RETRY_TIMES,
            delay: (error: any) => {
              if (shouldRetry(error)) {
                return timer(1000);
              }
              return throwError(() => error);
            }
          }), catchError((error) => {

    let errorMessage = "An unexpected error has occurred.";
    if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // console.error('An error occurred:', error.error.message); errorMessage = Client-side error: ${error.error.message}`; 
        } else {
        }
        switch (error.status) {
        
        case HttpStatusCode.Unauthorized:
            console.error(`Unauthorized: ${error.statusText}`); 
            errorMessage = `Unauthorized: ${error.statusText}`; 
            break;
        case HttpStatusCode.Forbidden:
            console.error(`Forbidden: ${error.statusText}`);
            errorMessage = `Forbidden Access: ${error.statusText}`;
            break;
        case HttpStatusCode.NotFound:
            console.error(`Resource not found: ${error.statusText}`);
            errorMessage = `Resource not found: ${error.statusText}`;
            break;
        case HttpStatusCode.ServiceUnavailable:
            
            console.error(`Service Unavailable: ${error.statusText}`);
            errorMessage = `Service Unavailable: ${error.statusText}`;
            break;
        case HttpStatusCode.Disconnected:
            console.error(`Could not connect to Server: ${error.statusText}`);
            errorMessage = `Could not connect to Server: ${error.statusText}`;
            break;
        }
    } else {
    }
        return throwError(() => new Error(errorMessage));
    })
    
    )
}

function shouldRetry (error: HttpErrorResponse): Observable<number> | null { 
    if ([HttpStatusCode.ServiceUnavailable, HttpStatusCode.Disconnected].includes(error.status)) {
        return timer(DELAY);
    }
    return null;
}