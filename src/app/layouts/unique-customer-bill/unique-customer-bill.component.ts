import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { logos } from 'src/app/password';
@Component({
  selector: 'app-unique-customer-bill',
  templateUrl: './unique-customer-bill.component.html',
  styleUrls: ['./unique-customer-bill.component.css']
})
export class UniqueCustomerBillComponent implements OnInit{

  customerId: any;
  customerD: any;
  recieptData: any;
  searchTextL = '';
  value_s: any
  totalLength: any;
  page:number =1
  img = logos

  /* Status management change */
  ON_GOING_STATUS: any = {
    0:{
      "status": "danger",
      "label": "unpaid",
    },
    1:{
      "status": "primary",
      "label": "paid",
    },
  }


  constructor(

    private toastre:  ToastrService,
    private billService: BillServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomersServiceService
  ){


  }
  ngOnInit(): void {

    //this.customerId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(
      params => this.customerId = params.id
    )
    this._onLoadCustomerData();
    this.onLoadCustomerBills();



  }

  _onLoadCustomerData(){
    this.customerService.getCustomerId(this.customerId).subscribe((customerData) => {
      this.toastre.success("Loaded success")
      this.customerD = customerData
      console.log(customerData)
    }, (error) => {
      console.log(error)
      this.toastre.error("INTERNAL SERVER ERROR")
    })
  }

  onLoadCustomerBills(){
    this.billService.getCustomerBillsById(this.customerId).subscribe(bills =>{
      console.log('test',bills)
      this.recieptData = bills


    }, (error) => {
      console.log(error)
    })
  }

  onPrintInvoice(id: any){

    this.router.navigateByUrl(`/receipt?id=${id}`);
    console.log(id)
  }

  onEditeData(id: any){
    this.router.navigateByUrl('/bills-form/'+id);
  }


}
