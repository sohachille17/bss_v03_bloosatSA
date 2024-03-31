import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { logos } from 'src/app/password';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';

@Component({
  selector: 'app-big-payment-receipt',
  templateUrl: './big-payment-receipt.component.html',
  styleUrls: ['./big-payment-receipt.component.css']
})
export class BigPaymentReceiptComponent {



  globalPaymnetID: any;
  paymentData: any;
  check: boolean = true
  PICTURE: any = logos;

  constructor(
    private toastr: ToastrService,
    private bigCusService: BigCustomerServiceService,
    private route: ActivatedRoute,
    private router: Router
    ){

  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.globalPaymnetID = params.id
    })
    console.log(this.globalPaymnetID)

    this._onLoadPaymentByID()


  }

  _onLoadPaymentByID(){
    this.bigCusService.getPaymentsUnique(this.globalPaymnetID).subscribe(payments => {
      console.log(payments)
      this.paymentData = payments

    })
  }
  onGeneratePaymentReceipt(){

  }


}
