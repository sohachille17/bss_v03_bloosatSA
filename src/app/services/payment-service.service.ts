import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from '../environments/bloosat.environment';
import { PaymentM } from '../models/payment.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {


  BLOOSAT__URL__CONNECTION = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION
  constructor(

    private http : HttpClient,
    private localStorage: LocalStorageService

    ) { }


 makePayment(paymentData: FormData): Observable<PaymentM>{
  console.log('new --> data',paymentData);

  //let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
  return this.http.post<PaymentM>(`${this.BLOOSAT__URL__CONNECTION}payments`, paymentData)


 }
 getPaymentsUnique(paymentUnique: any){
  return this.http.get(`${this.BLOOSAT__URL__CONNECTION}payments/${paymentUnique}`, )
 }


 getPaymentsByID(paymentID: any){
  return this.http.get(`${this.BLOOSAT__URL__CONNECTION}payments/customer/${paymentID}`);
 }

}
