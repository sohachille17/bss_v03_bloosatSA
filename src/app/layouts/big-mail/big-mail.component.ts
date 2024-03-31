import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, shareReplay, tap, throwError } from 'rxjs';
import { logos } from 'src/app/password';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';
@Component({
  selector: 'app-big-mail',
  templateUrl: './big-mail.component.html',
  styleUrls: ['./big-mail.component.css']
})
export class BigMailComponent {



  newDeviceType: any;
  newOperatingSystem: any;
  logoUrl = logos
  invoiceId: any;
  bloosatIMG =logos
  invoiceData: any
  customerId: any
  itemsData: Array<any> = []


    // getting windows instance
    public screenWith: any;
    public screenHeight: any;
  constructor(

    private router: Router,
    private route : ActivatedRoute,
    private bigCustomerBillService: BigCustomerServiceService

  ){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.invoiceId =  params.id
    })
    this.onDisplayReceiptData(this.invoiceId)




        //assigning screen variable to screen instance
        this.screenWith = window.innerWidth
        this.screenHeight = window.innerHeight;

        console.log(this.screenWith);
        console.log(this.screenHeight);

        // Getting operating system of device to fork with

        const detail = navigator.userAgent.split(" ");
        const os = detail[1].split("(")[1];
        const deviceType = detail[2];
        console.log("Data navigation style")
        //console.log(os,deviceType)
        console.log(os, deviceType)
        this.newOperatingSystem = os;
        this.newDeviceType = deviceType;
        console.log("Data navigation style")

        // Comparison between operating system  && device

        if(deviceType === "Android"){
          console.log("auto print for android");
        }
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




}
