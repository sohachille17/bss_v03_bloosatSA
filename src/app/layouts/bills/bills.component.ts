import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';

import { BillServiceService } from 'src/app/services/bill-service.service';
import Swal from 'sweetalert2';
import { STATUS_UTILES } from 'src/app/password';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  invoiceData: any[] = []
  searchTextL = '';
  value_s: any
  totalLength: any;
  page:number =1;
  userRole: any;

  constructor(
    private toastr: ToastrService,
    private confirmService: NgConfirmService,
    private router: Router,
    private localService: LocalStorageService,
    private invoiceService: BillServiceService){

  }
  ngOnInit(): void {
    this.userRole =  this.localService.getRole()
   this.onGETData()
  }


  editInvoiceForm(id:any){
    this.router.navigateByUrl('/bills-form/'+id)
  }

  onDeleteInvoice(id:any){
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       // console.log(id);
        this.invoiceService.deleteInvoice(id).subscribe(()=>{
          this.toastr.info('Invoice deleted successfully',"MSG")
        })
        this.onGETData();


      }
    },(error)=>{
      console.log(error);

    })
    //Swal.fire("Hello world!!");
    this.onGETData();

  }

  onGETData(){
    this.invoiceService.getAllBills().subscribe((invoice: any) => {
      console.log(invoice)
      this.invoiceData = invoice?.data;
      //this.invoiceData.reverse();
     })
  }

  onPrintInvoice(id: any){

    this.router.navigateByUrl(`/receipt?id=${id}`)
    console.log(id)
  }

}
