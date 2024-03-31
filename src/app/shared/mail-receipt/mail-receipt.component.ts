import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillServiceService } from 'src/app/services/bill-service.service';
import Swal from 'sweetalert2';
import {logos} from '../../password'
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-mail-receipt',
  templateUrl: './mail-receipt.component.html',
  styleUrls: ['./mail-receipt.component.css']
})
export class MailReceiptComponent implements OnInit {


  onprintModeID: any ;
  recieptData: any;
  itemsData: any;
  capital_num: any = 50000000;//capital number
  bloosatIMG: any = logos;
  newDeviceType: any;
  newOperatingSystem: any;

  // getting windows instance
  public screenWith: any;
  public screenHeight: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceBill: BillServiceService,
    private toastr: ToastrService
    ){

  }


  ngOnInit(): void {
    this.onprintModeID = this.route.snapshot.paramMap.get('id');

    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.onprintModeID = params?.id
      console.log(this.onprintModeID);
      return params;

    });


    this.serviceBill.getOnebillById(this.onprintModeID).subscribe(valPrint => {
      console.log(valPrint);
      this.recieptData = valPrint;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Data Loaded successfully',
        showConfirmButton: false,
        timer: 1500
      })

      this.serviceBill.getInvoiceByBillsID(this.onprintModeID).subscribe(items =>{
        this.itemsData = items;
      })
      //this.toastr.info("Data Loaded successfully","INFO")

    })


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

}
