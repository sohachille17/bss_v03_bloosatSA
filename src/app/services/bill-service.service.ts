import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bills } from '../models/bills.model';
import { Observable } from 'rxjs';
import { environmentAPI } from '../environments/bloosat.environment';

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {

   BLOOSAT_URL_CONNECTION = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + "bills";
   getBill = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION;
  constructor(
    private http: HttpClient
    ) { }



    /**
     *@DSCRIPTION 
     create new bill 
     */
    createBillInvoiceService(billInvoice: any){

      return this.http.post(`${this.BLOOSAT_URL_CONNECTION}/create`,billInvoice);

    }

    getAllBills():Observable<[]>{
      return this.http.get<[]>(`${this.getBill}allBills`);
    }
    
    getOnebillById(id:any){
      return this.http.get(`${this.getBill}bill/show_bill/${id}`);
    }

    getInvoiceByBillsID(billId: any){
      return this.http.get(`${this.getBill}bill/details/${billId}`);
    }

    updateBilling(invoice: any, id: any){
      return this.http.post(`${this.getBill}bill/update/${id}`, invoice);
    }
    deleteInvoice(invoiceID: any){
      return this.http.get(`${this.getBill}bill/delete/${invoiceID}`);
    }


    getCustomerBillsById(customersBill: any){
      return this.http.get(`${this.getBill}bill/customers/${customersBill}`)
    }


   
}
