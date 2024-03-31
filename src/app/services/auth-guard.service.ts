import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private router:Router, 
    private localStorage: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.localStorage.getToken();
    if(token){
      return true
    }else{

      this.router.navigate(['/login']);
      return false;
    }

  }


  
}
