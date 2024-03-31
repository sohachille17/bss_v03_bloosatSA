import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Route, Router, } from "@angular/router"
import { FormBuilder, FormControl, Validators } from "@angular/forms"
import { FormGroup } from "@angular/forms"
import { ToastrService } from "ngx-toastr"
import { LocalStorageService } from "src/app/services/local-storage.service"
import { AuthService } from "src/app/services/authentication/auth.service"
import { Observable } from "rxjs"
import { emailReg, matchPaassword } from "src/app/password"
import { StrongPasswordRegx } from "src/app/password"
import { Users } from "src/app/models/users.model"
import Swal from "sweetalert2"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {


  userForms!: FormGroup;
  userSubscribData!: Observable<any>;
  globalUserId: any;
  newOngoing: any;
  onEditMode!: boolean;
  totalLength: any;
  page:number =1;

  newUserData: any;
  isSipinner: boolean = false;
  userAuthService!: Observable<any>;
   userRoles: any = [
    {
      id: 0,
      role: "admin"
    },
    {
      id: 1,
      role: "commercial"
    },
    {
      id: 2,
      role: "financial"
    },
    // {
    //   id: 3,
    //   role: "comptable"
    // },

  ]

  USER_STATUS = {
    'active': {
      'status': "primary",
      'label': "active"

    },
    'blocked': {
      'status':"danger",
      'label': "blocked"
    }
  }








  constructor(

    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private toastre: ToastrService,
    private router: Router,
    private authService : AuthService
  ){

  }



  ngOnInit(): void {
    this.__onInitUserForm();
    this.__onGetUsers()
  }

  __onInitUserForm(){

    // getting user form from form controp as group
    this.userForms = this.formBuilder.group({

      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailReg)]),
      password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
      role: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)])
    },{
      validators : matchPaassword
    });
  }

  __onGetUsers(){
    this.newOngoing = this.USER_STATUS;


      this.authService.getAllUsers().subscribe((userData) =>{

      this.toastre.success("users get successfully");
      console.log(userData);
      this.newUserData = userData;


    }, (error) => {
      this.toastre.error("Internal Server Error", "BSS-ERROR")
      console.log(error.errors.email[0]);

    })
  }

  onEditUser(userId: any){
    this.onEditMode = true
    this.globalUserId = userId;
    this.authService.onUserById(this.globalUserId).subscribe((data: any) => {
      let userData: any = data;
      console.log(userData.user);

      if(userData != null){
        this.userForms.setValue({

          name: userData.user.name,
          email: userData.user.email,
          role: userData.user.role,
          password: '',
          password_confirmation: ''


        })
      }
    })

  }



  get name(){
    return this.userForms.get("name");
  }
  get email(){
    return this.userForms.get("email");
  }
  get password(){
    return this.userForms.get("password");
  }
  get role(){
    return this.userForms.get("role");
  }
  get password_confirmation(){
    return this.userForms.get("password_confirmation")
  }

  //   password(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: confirmPassword } = formGroup.get('confirmpassword');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }



  onRegisterUserSave(){
       this.isSipinner = true

    const registerData: Users = {
      name: this.userForms.value.name,
      email: this.userForms.value.email,
      password: this.userForms.value.password,
      password_confirmation: this.userForms.value.password_confirmation,
      role: this.userForms.value.role,

    }


      this.authService.registerUser(registerData).subscribe(newUser =>{
        this.toastre.success("New User created",'BSS-SUCCESS');
        console.log(newUser);
        this.isSipinner = false
        this.userForms.reset();
        this.__onGetUsers();


      },(error)=>{
        this.toastre.error("Internal Server Error", 'BSS-ERROR');
        console.log(error);
        this.isSipinner = false

      })
    console.log(registerData)
  }


  onLockUserAccount(userId: any){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        const user$ = this.authService.onLockUserAccount(userId);
        user$.subscribe((result) => {
          console.log(result)
          this.__onGetUsers()
        },err=>{
          console.log(err);

        })


        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })







  }

  ngOnDestroy(): void {

  }




}
