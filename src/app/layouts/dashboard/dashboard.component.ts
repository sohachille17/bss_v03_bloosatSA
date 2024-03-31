import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DEFAULT_PICTURES } from 'src/app/password';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { Status } from 'src/app/models/status.model';
import { BlooServiceService } from 'src/app/services/bloo-service.service';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';
import { filter, map, tap } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

userName: any;
email: any;
profileURL = DEFAULT_PICTURES;
totalCustomer!: Status;
spinnerCount = true;
productCounter: any ;
serviceCounter: any;
userCounter: any;
userRole: any;
grandCount: any;

statusWork: boolean = false;
loading_ms: boolean = true


  constructor(
    private localStorage: LocalStorageService,
    private customerService: CustomersServiceService,
    private blooService: BlooServiceService,
    private userService: AuthService,
    private grandcustomerService: BigCustomerServiceService
    ){



      this.customerService.getCustomersCount().subscribe(count =>{
        //console.log(count.count);
        this.totalCustomer = count
        console.log(this.totalCustomer);
        //this.spinnerCount = true
        if( this.totalCustomer){
          this.spinnerCount = true
        }


      },error =>{
        console.log(error);

      })

  }
  ngOnInit(): void {

    this.onUsersCount();
    this.onProductCount();
    this.onServiceCount();
    this.onBigCustomer()
   this.userName = this.localStorage.getUserName();
   this.email = this.localStorage.getEmail();
   this.userRole = this.localStorage.getRole();

   // big customer



  }


  onBigCustomer(){

    const grandCount$ = this.grandcustomerService.getCustomersCount();
    const mapCount$ = grandCount$
    mapCount$.subscribe(countG =>{
      this.grandCount = countG
    })


  }


  onProductCount(){
    this.blooService.getProductCount().subscribe((productCount) => {

      //console.log("PROD-COUNT",productCount);
      this.productCounter = productCount

    })
  }
  onServiceCount(){
    this.blooService.getServiceCount().subscribe((serviceCount) => {

      this.serviceCounter = serviceCount

    })
  }
  onUsersCount(){
    return this.userService.getUsersCount().subscribe((userCount) => {

      this.userCounter = userCount
    })
  }






}
