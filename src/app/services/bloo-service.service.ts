import { Injectable } from '@angular/core';
import { environmentAPI } from '../environments/bloosat.environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class BlooServiceService {

  BLOOSAT_SERVICE__URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'services'
  constructor(

    private http: HttpClient
  ) { }



  /**
   *@Description SERVICE -> HANDLER FOR OUR BLOO-INJECTIONS
    @author SOH ACHILLE
    @copyright BLOOSAT SA  
   */


    // create a new service
    createNewService(serviceData: any){
      return this.http.post(`${this.BLOOSAT_SERVICE__URL}`, serviceData);
    }
    //get all service from database
    __getAllService(): Observable<ServiceModel[]>{
      return this.http.get<ServiceModel[]>(`${this.BLOOSAT_SERVICE__URL}`);
    }
    //get Service By ID
    __onGetServiceById(serviceID: any){
      return this.http.get(`${this.BLOOSAT_SERVICE__URL}/${serviceID}`);
    }
    __onDeleteService(serviceID: any){
      return this.http.delete(`${this.BLOOSAT_SERVICE__URL}/${serviceID}`);
    }
    //get update bloosat service
    __onUpdateServiceByID(serviceID:any, serviceData:any){

      return this.http.put(`${this.BLOOSAT_SERVICE__URL}/${serviceID}`, serviceData)
    }

    // __getProduct && Services
    __product_and_services(){
      return this.http.get(`${this.BLOOSAT_SERVICE__URL}/products-and-services`);
    }

      // get total product count
      getProductCount(){

        return this.http.get(`${this.BLOOSAT_SERVICE__URL}/count-all-products`);
      }
      // getTotalService
      getServiceCount(){
        return this.http.get(`${this.BLOOSAT_SERVICE__URL}/count-all-services`);
      }

      
}
