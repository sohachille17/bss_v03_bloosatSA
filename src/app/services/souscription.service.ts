import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from '../environments/bloosat.environment';
import { SouscriptionKAFUtils } from '../common/souscriptionKAF-utils';

@Injectable({
  providedIn: 'root'
})
export class SouscriptionService {


  BLOOSAT_URL_CONNECTION = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION




  constructor(private http: HttpClient) { }



  makeSouscriptionKAF(souscriptionKAF: any){

    return this.http.post(`${this.BLOOSAT_URL_CONNECTION}subscriptions`, souscriptionKAF)

  }

  getSouscriptionKAF(customerID: any){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}subscriptions/customer/${customerID}`);
  }

  getSouscriptionIWAY(customerID: any){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}subscriptions/customer/${customerID}?type=IWAY`);
  }

  getSouscriptionBLUESTAR(customerID: any){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}subscriptions/customer/${customerID}?type=BLUESTAR`);
  }

  getSouscriptionByIdUnique(souscription: any){
    return this.http.get(`${this.BLOOSAT_URL_CONNECTION}subscriptions/${souscription}`);
  }

  updateSouscriptionKAF(souscriptionKAF: any, sousId: any){


    return this.http.patch(`${this.BLOOSAT_URL_CONNECTION}subscriptions/${sousId}`, souscriptionKAF)


  }

  postSouscriptionEnd(souscriptionData: any){

    return SouscriptionKAFUtils(`${this.BLOOSAT_URL_CONNECTION}subscriptions/terminate-and-endcycle`, souscriptionData);
  }

  stopKAF(stop: any){
    return this.http.post(`${this.BLOOSAT_URL_CONNECTION}subscriptions/terminate-and-endcycle`,stop)
  }

  sendSousID(sousID: any){
    return this.http.post(`${this.BLOOSAT_URL_CONNECTION}subscriptions/toggle-consumption`,sousID)
  }





}
