import { Injectable } from '@angular/core';
import { environmentAPI } from '../environments/bloosat.environment';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class ProductServicesService {

  

  BLOOSAT_URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'product'
  constructor(

    private http: HttpClient
  ) { }


  createProduct(product: Products):Observable<Products>{
      return this.http.post<Products>(`${this.BLOOSAT_URL}/create`, product)
  }

  getProduct():Observable<Products[]>{
    return this.http.get<Products[]>(`${this.BLOOSAT_URL}`)
  }
  

  // updateProduct(product: Products, productId: string): Observable<Products>{
  //   return this.http.put<Products>(`${this.BLOOSAT_URL}/update` +productId, )

  // }





}
