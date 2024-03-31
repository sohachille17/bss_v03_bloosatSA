import { Injectable } from '@angular/core';
const TOKEN = "jwtToken";
const USERNAME = "username";
const EMAIL = "useremail";
const ROLE = "userRole"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  //REFERING TO USER DETAILS

  setUserName(username: any){
    localStorage.setItem(USERNAME, username);
  }
  getUserName(): string | null {
    return localStorage.getItem(USERNAME);
  }
  removeUserName(){
    localStorage.removeItem(USERNAME);
  }

  // REFERING TO USER EMAIL

  setEmail(useremail: any){
    localStorage.setItem(EMAIL, useremail)
  }
  getEmail(): string | null {
    return localStorage.getItem(EMAIL);
  }
  removeEmail(){
    localStorage.removeItem(EMAIL);
  }

  // REFERING TO USER TOKEN
  setToken(data: any){
    localStorage.setItem(TOKEN, data);
  }
  getToken(): string | null{
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
     localStorage.removeItem(TOKEN);
  }

  //REFERING TO USER ROLE
  setRole(data: any){
    localStorage.setItem(ROLE, data)
  }
  getRole(): string | null{
    return localStorage.getItem(ROLE)
  }
  removeRole(){
    localStorage.removeItem(ROLE)
  }

}




// importing this reference for out  local/Utiles files
 export function setToken(data: any){
    localStorage.setItem(TOKEN, data);
  }
 export function getToken(): string | null{
    return localStorage.getItem(TOKEN);
  }
