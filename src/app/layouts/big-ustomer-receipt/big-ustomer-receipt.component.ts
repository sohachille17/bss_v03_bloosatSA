import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, shareReplay, tap, throwError } from 'rxjs';
import { logos } from 'src/app/password';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';
@Component({
  selector: 'app-big-ustomer-receipt',
  templateUrl: './big-ustomer-receipt.component.html',
  styleUrls: ['./big-ustomer-receipt.component.css']
})
export class BigUstomerReceiptComponent implements OnInit {


  logoUrl = logos
  invoiceId: any;
  invoiceData: any
  customerId: any
  itemsData: Array<any> = []

  constructor(

    private router: Router,
    private route : ActivatedRoute,
    private bigCustomerBillService: BigCustomerServiceService

  ){

  }

  ngOnInit(): void {
    this.invoiceId =  this.route.snapshot.paramMap.get("id")
    this.onDisplayReceiptData(this.invoiceId)
  }


  onDisplayReceiptData(invoiceId: any){


      const httpReceiptData$ = this.bigCustomerBillService.getBigInvoice(invoiceId);
      const resData$ = httpReceiptData$.pipe(
        tap(() => console.log("Shared replay done!! successfully!!") ),
        shareReplay(),
        catchError(err => {
          console.log(err)
          return throwError(err)})
      )
      resData$.subscribe(billData => {
  // console.log(billData)
      this.invoiceData = billData
      this.invoiceData.id = this.invoiceData.customers.id
      })
  // Double subscription to get the items data
        resData$.pipe(
          map((value: any) => Object.values(value.bill_item))
        ).subscribe(items => {
          this.itemsData = items
          console.log("ITEMS==>",items)
        })
  }


  onReturn(){
    this.router.navigateByUrl('/unique-big-customer-bill/'+ this.invoiceData.id)
  }
}
