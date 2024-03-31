import { Injectable } from '@angular/core';
import { environmentAPI } from '../environments/bloosat.environment';
import { bigCustomersUtils } from '../common/big-customers-utils';
import { HttpClient } from '@angular/common/http';
import { Customers } from '../models/customers.model';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class BigCustomerServiceService {

  BLOOSAT_URL_CONNECTION = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION

  constructor(private http: HttpClient) { }



  // creating a big customer from over fetch observable
  // createBigCustomer(customerData: any){

  //   return bigCustomersUtils(`${this.BLOOSAT_URL_CONNECTION}big-customers/create`, customerData)
  // }

    // Create customers
    createBigCustomer(customerData:Customers): Observable<Customers>{
      return this.http.post<Customers>(`${this.BLOOSAT_URL_CONNECTION}big-customers/create`, customerData)
    }

    getCustomers(): Observable<Customers[]>{
      return this.http.get<Customers[]>(`${this.BLOOSAT_URL_CONNECTION}big-customers`);
    }
      //get one customer

  getCustomerId(customers: any): Observable<Customers>{

    return this.http.get<Customers>(`${this.BLOOSAT_URL_CONNECTION}big-customers/${customers}`);


  }

  updateCustom(customer: Customers, customerId: string): Observable<Customers>{


    return this.http.put<Customers>(`${this.BLOOSAT_URL_CONNECTION}big-customers/update/${customerId}`, customer)


  }

  getCustomersCount(): Observable<Status>{
    return this.http.get<Status>(`${this.BLOOSAT_URL_CONNECTION}big-customersCount`)
  }

  // working with big customers


  getBigCustomerBill(customerID: any): Observable<any>{
    //{{base_url}}/api/big-customer-bill/customer/{customerId}
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}big-customer-bill/customer/${customerID}`)
  }

  getBigInvoice(invoiceId: any){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}big-customer-bill/${invoiceId}`)
  }

  getPaymentsByID(customerId: any){

    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}big-payments/customer/${customerId}`)
  }

  getPaymentsUnique(paymentUnique: any){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}big-payments/${paymentUnique}`, )
   }
}


