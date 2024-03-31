import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from '../environments/bloosat.environment';

@Injectable({
  providedIn: 'root'
})
export class BigSubscriptionService {

  BLOOSAT_URL_CONNECTION = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION


  constructor(
    private http: HttpClient
  ) { }

  createBigSubscription(subscriptionData: any){
    return this.http.post(`${this.BLOOSAT_URL_CONNECTION}big-subscriptions`, subscriptionData)
  }

  getSubscriptionByCustomerID(customerID: string){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}big-subscriptions/customer/${customerID}`)

  }

  getSiteBySubscriptionID(subscriptionID: string){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}big-subscriptions/sites/${subscriptionID}`)
  }
}
