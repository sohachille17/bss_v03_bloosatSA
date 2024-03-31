import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from 'src/app/environments/bloosat.environment';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users.model';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL BLOOSAT (BSS) CONNECTION
  //BLOOSAT_URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'user';
  BLOOSAT_URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION

  constructor(private http: HttpClient,
     private local: LocalStorageService,
     private router: Router,
     private toastr: ToastrService
     ) { }




  // loginService for our registered user in our laravel api

  loginUsers(email: string, password: string):Observable<Users>{
    return this.http.post<Users>(`${this.BLOOSAT_URL}login`,{ email, password});
  }

  registerUser(userData: any):Observable<Users>{
    return this.http.post<Users>(`${this.BLOOSAT_URL}register`, userData)
  }
  getAllUsers(){
    return this.http.get(`${this.BLOOSAT_URL}users`)
  }

  logout(){
    this.local.removeToken();
    this.local.removeEmail();
    this.local.removeUserName();
    this.local.removeRole();
    this.router.navigate(['/login']);
    this.toastr.warning("Logged out successfully")
  }

  //get all user
  getUsersCount(){
    return this.http.get(`${this.BLOOSAT_URL}users/count`)
  }

  //get userbyID
  onUserById(userId: any){
    return this.http.get(`${this.BLOOSAT_URL}users/${userId}`)
  }

  // on lock user Account

  onLockUserAccount(userId: any){
    return this.http.delete(`${this.BLOOSAT_URL}users/${userId}`)
  }

}
