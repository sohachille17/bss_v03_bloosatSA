import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from '../environments/bloosat.environment';
import { Customers } from '../models/customers.model';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';
import { TmplAstHoverDeferredTrigger } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {


  BLOO_SAT_URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'product'
  

  constructor(
    private http: HttpClient,
    
    ) { }



    /** @Description create new product using Observables */
    createProduct(product: Products): Observable<Products>{
      return this.http.post<Products>(`${this.BLOO_SAT_URL}/create`, product)
    }
    /**
     *@Description GET -> all product form o
      MYSQL DATABASE
      @author SOH ACHILLE
      */
    getProducts():Observable<Products[]>{
      return this.http.get<Products[]>(`${this.BLOO_SAT_URL}`)
    }

    getProductById(product: any): Observable<Products>{

      return this.http.get<Products>(`${this.BLOO_SAT_URL}/${product}`);
      
  
    }

    onDELETEPRODUCTS(producId: any){
       return this.http.get(`${this.BLOO_SAT_URL}/delete/${producId}`)
      
    //return this.http.get(`http://127.0.0.1:8000/api/product/delete/${producId}`)
    }

    _updateProducts(productId: any, productData: any){
      return this.http.put(`${this.BLOO_SAT_URL}/update/${productId}`, productData)
    }


}
