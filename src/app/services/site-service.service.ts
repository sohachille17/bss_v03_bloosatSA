import { Injectable } from '@angular/core';
import { environmentAPI } from '../environments/bloosat.environment';
import { postCustomerSite, getSiteData,updateCustomerSite  } from '../common/site-utils';
import { makeBundle, getBundleBYID, getUniqueBundle } from '../common/bundle-utils';
import {bigCustomersCreateBill} from '../common/big-customers-utils'
import { HttpClient } from '@angular/common/http';
import { Status } from './../models/status.model';
@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {

  BLOOSAT_URL_CONNECTION = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION

  constructor(
    private http: HttpClient
  ) { }



    //1.
  ///  (((SITE))) MAKE API CONNECTIVITY  BLOO DEVELOPERS  ///


  createSite(siteData: any){
    return postCustomerSite(`${this.BLOOSAT_URL_CONNECTION}sites`,siteData)
  }

  getSiteData(customerId:any){
    return getSiteData(`${this.BLOOSAT_URL_CONNECTION}sites/customer`,customerId)
  }
  getSiteID(customerId:any){
    return getSiteData(`${this.BLOOSAT_URL_CONNECTION}sites`,customerId)
  }


  //2.
  ///  (((BUNDLE))) MAKE API CONNECTIVITY  BLOO DEVELOPERS  ///


  // create new bundle
  createNewBundleItem(bundleData: object){
    return makeBundle(`${this.BLOOSAT_URL_CONNECTION}site-items`, bundleData)
  }
  // getBundleByID

  getBundleById(siteID: any){
    return getBundleBYID(`${this.BLOOSAT_URL_CONNECTION}site-items/site`,siteID)
  }

  // get one unique bundle here  !!!
  getBundleID(bundleID: string){
    return getUniqueBundle(`${this.BLOOSAT_URL_CONNECTION}site-items`, bundleID)
  }


  // create bill
  createNewCustomerBill(billingData: any){
    return this.http.post(`${this.BLOOSAT_URL_CONNECTION}big-customer-bill`,billingData)
    //return bigCustomersCreateBill(`${this.BLOOSAT_URL_CONNECTION}big-customer-bill`, billingData)
  }

  // UPDATE SITE
  updateSiteByCustomerID(customerId: any, siteData:  any){
    return updateCustomerSite(`${this.BLOOSAT_URL_CONNECTION}sites/${customerId}`, siteData)
  }

  // Update site status
  updateSiteStatus(siteId: any, status: string){
    const updatedstatus = status === "active"?"inactive":"active";
    return this.http.put(`${this.BLOOSAT_URL_CONNECTION}sites/${siteId}`, {status:updatedstatus})

  }

  // Update bundle by bundleID
  updateBundle(bundleID: string, bundleData: any){
    return this.http.put(`${this.BLOOSAT_URL_CONNECTION}site-items/${bundleID}`, bundleData)
  }
}
