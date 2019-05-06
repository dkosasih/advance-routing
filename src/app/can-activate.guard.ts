import { Injectable, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
