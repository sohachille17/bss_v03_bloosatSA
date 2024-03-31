import { Component , OnInit} from '@angular/core';
import { StrongPasswordRegx } from 'src/app/password';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { emailReg } from 'src/app/password';
import { ToastrService } from 'ngx-toastr';
import {logos} from '../../password'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  userinfo: any;
  //emailReg: string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  spinnerControl: boolean = false;
  authError = false;
  imageLogo: any = logos;
  isSumitted: boolean = false;
  isBtnShow: any = false;
  errorMessage: string = "Email && Password mat have a problem";

  // private constructopr
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private toatre: ToastrService
            ){

  }
  ngOnInit(): void {
    this.__initLoginForm();


  }


  private __initLoginForm(){

    this.loginFormGroup = this.formBuilder.group({

      email: new FormControl('', [Validators.required, Validators.pattern(emailReg)]),
      password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)])

    });
  }


  get email(){
    return this.loginFormGroup.get('email');
  }
  get password(){
    return this.loginFormGroup.get('password');
  }


  //  emails = "achillesoh15@gmail.com"
  //  passwords = "Index.love12345@";
// Login users with respect to data in our database
//proper connection with our laravel service via new HTTP SERVICE
/**@author SOH ACHILLE */
  onLoginUser(){


    this.spinnerControl = true;

   const userData: Users ={
    email: this.loginFormGroup.value.email,
    password: this.loginFormGroup.value.password
   }

   if(this.loginFormGroup.invalid){
    return;
   }

   //connection with loginService from api
   this.auth.loginUsers(userData.email, userData.password).subscribe((user)=>{
    //const user = reponse.user;
    // console.log(user.email/);
    console.log(user);

    // console.log(user.name);

    this.toatre.success(` ${user.name}  you logged in successfully!!!`);
    console.log(user.token)
    this.localStorage.setToken(user.token);
    this.localStorage.setUserName(user.name);
    this.localStorage.setEmail(user.email);
    this.localStorage.setRole(user.role);

    this.router.navigate(['/']);

   }, (error:HttpErrorResponse)=>{

    // this.toatre.error("Internal Server Error")
    this.authError = true;
    this.spinnerControl = false;
    if(error.status !== 400){
      //console.log();


      this.errorMessage = error['error']['error']
      this.toatre.error(`${this.errorMessage}`, 'Error', {
        timeOut: 8000,
        progressBar: true
      })
    }
   })


   // connection with our authService as auth from authService ts file (API_URL)
   console.log(userData);






  }




}
