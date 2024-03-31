import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from '../environments/bloosat.environment';
import { Customers } from '../models/customers.model';
import { Observable, map } from 'rxjs';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

    //URL BLOOSAT (BSS) CONNECTION
    BLOOSAT_URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'customers'
    COUTURL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'customersCount'
    BLOOSAT_ = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION +'bill/customers'

  constructor(

    private http: HttpClient
  ) { }




  // Create customers
  createCustomer(customer:Customers): Observable<Customers>{
    return this.http.post<Customers>(`${this.BLOOSAT_URL}/create`, customer)
  }
  //Get all customers

  updateCustom(customer: Customers, customerId: string): Observable<Customers>{

    
    return this.http.put<Customers>(`${this.BLOOSAT_URL}/update/${customerId}`, customer)


  }
  _onGetCustomerUniqueBills(customerId: any){
    return this.http.get(`${this.BLOOSAT_}/${customerId}`);
  }





  //

  getCustomers(): Observable<Customers[]>{
    return this.http.get<Customers[]>(`${this.BLOOSAT_URL}`);
  }

  //get one customer

  getCustomerId(customers: any): Observable<Customers>{

    return this.http.get<Customers>(`${this.BLOOSAT_URL}/${customers}`);
    

  }

  getCustomersCount(): Observable<Status>{
    return this.http.get<Status>(`${this.COUTURL}`)
  }





  
}

 
