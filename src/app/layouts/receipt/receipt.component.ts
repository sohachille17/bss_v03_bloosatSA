import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillServiceService } from 'src/app/services/bill-service.service';
import Swal from 'sweetalert2';
import {logos} from '../../password'


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  onprintModeID: any ;
  recieptData: any;
  itemsData: any;
  capital_num: any = 50000000;//capital number
  bloosatIMG: any = logos;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceBill: BillServiceService,
    private toastr: ToastrService
    ){

  }

  ngOnInit(): void {
    //this.onprintModeID = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(
      params => this.onprintModeID = params.id
    )
    this.serviceBill.getOnebillById(this.onprintModeID).subscribe(valPrint => {
      console.log(valPrint);
      this.recieptData = valPrint;
      this.recieptData.dateLimitTest = this.recieptData.invoice.billNumber.slice(0,3);


      console.log(this.recieptData);

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


  }







}
