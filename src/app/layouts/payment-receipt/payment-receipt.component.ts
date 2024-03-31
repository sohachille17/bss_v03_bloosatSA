import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { logos } from 'src/app/password';
@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  globalPaymnetID: any;
  paymentData: any;
  check: boolean = true
  PICTURE: any = logos;

  constructor(
    private toastr: ToastrService,
    private paymentService: PaymentServiceService,
    private route: ActivatedRoute,
    private router: Router
    ){

  }
  ngOnInit(): void {

    this.globalPaymnetID = this.route.snapshot.paramMap.get('id');
    console.log(this.globalPaymnetID)

    this._onLoadPaymentByID()


  }

  _onLoadPaymentByID(){
    this.paymentService.getPaymentsUnique(this.globalPaymnetID).subscribe(payments => {
      console.log(payments)
      this.paymentData = payments

    })
  }
  onGeneratePaymentReceipt(){

  }

}
