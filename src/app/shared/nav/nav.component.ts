import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DEFAULT_PICTURES } from 'src/app/password';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userName: any;
  email: any;
  profileURL = DEFAULT_PICTURES;

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService){

  }





  ngOnInit(): void {
   this.userName = this.localStorage.getUserName();
   this.email = this.localStorage.getEmail();

  }


  logoutUsers(){


    Swal.fire({
      title: 'Etes vous sure de vouloir vous deconnecter?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Oui`,
      cancelButtonText:`Non`
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: 'Deconnection reussi',
          icon: 'success'
      })
      }
    })

  }

}
