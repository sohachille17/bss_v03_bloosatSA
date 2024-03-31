import { Component } from '@angular/core';
import {logos } from '../../password'
import { ToastrService } from 'ngx-toastr';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';
import { Observable, catchError, filter, map, of, pipe, throwError } from 'rxjs';

@Component({
  selector: 'app-unique-big-customer-bill',
  templateUrl: './unique-big-customer-bill.component.html',
  styleUrls: ['./unique-big-customer-bill.component.css']
})
export class UniqueBigCustomerBillComponent {



  customerId: any;
  customerD: any;
  recieptData: any;
  searchTextL = '';
  value_s: any
  totalLength: any;
  page:number =1
  img = logos
  loading: boolean = false
  bigDataBill!: Observable<any>


  /* Status management change */
  ON_GOING_STATUS: any = {
    0:{
      "status": "danger",
      "label": "non payer",
    },
    1:{
      "status": "primary",
      "label": "payer",
    },
  }


  constructor(

    private toastre:  ToastrService,
    private billService: BillServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private bigCustomerService: BigCustomerServiceService,
    private customerService: CustomersServiceService
  ){


  }
  ngOnInit(): void {
    this._onLoadCustomerData()

    //this.customerId = this.route.snapshot.paramMap.get('id');
    //console.log(this.customerId)
    // this._onLoadCustomerData();
    // this.onLoadCustomerBills();



  }

  _onLoadCustomerData(){
    this.customerId = this.route.snapshot.paramMap.get('id');
    // loading unique big customjer
    console.log("FFFFFF", this.customerId)
    const httpCustomerData$ =  this.bigCustomerService.getBigCustomerBill(this.customerId)
    const billDa$ =  httpCustomerData$.pipe(
      catchError(err => {
        console.log('There was a new error',err)
        return throwError(err)
      })
    )

  this.bigDataBill = billDa$

  }


  onLoadCustomerBills(){


    // loading unique customerbill
  }

  onPrintInvoice(invoiceId: any){

    this.router.navigateByUrl('/big-customer-reciept/'+invoiceId);
    console.log(this.customerId)
  }
  onSiteForm(){
    this.router.navigateByUrl(`/customerSite?id=${this.customerId} ` );
  }

  onEditeData(id: any){
    this.router.navigateByUrl('/bills-form/'+id);
  }

}
