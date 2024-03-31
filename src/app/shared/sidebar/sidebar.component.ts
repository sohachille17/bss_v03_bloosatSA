import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  customerTest: any
  userRole: any;

  constructor(

    private customerService: CustomersServiceService,
    private router: Router,
    private localstorageService: LocalStorageService,
    private toastre: ToastrService
  ){

    this.customerService.getCustomers().subscribe(custom=>{
      this.customerTest = custom
      console.log(this.customerTest.id)
    })



  }
  ngOnInit(): void {

    this.userRole = this.localstorageService.getRole()
  }


  onTest(customerId: any){
    this.router.navigateByUrl(`customers/${customerId}`)
  }




  stillWorkingOn(){
    this.toastre.info("Désolé, monsieur/madame, mais nous travaillons toujours sur cette fonctionnalité", 'Encour', {
      timeOut: 8000,
      progressBar: true
    })
  }

}
