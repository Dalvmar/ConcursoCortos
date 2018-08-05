import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable }  from '@angular/core';
import { SessionService } from '../../services/session';




@Injectable()
export class NegateUserLoggedInGuard implements CanActivate {    
  constructor(public sessionService: SessionService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return this.sessionService.isLogged() ? true  : false;
    }
}