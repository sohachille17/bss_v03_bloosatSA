import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentAPI } from '../environments/bloosat.environment';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {


  BLOOSAT__URL__CONNECTION =  environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'category'
  BLOOSAT_GET = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION + 'category'
  constructor(
    private http: HttpClient
  ) { }





  /**
   * @description CREATION OF A NEW CATEGORY SERVICE
   * @author SOH ACHILLE
   * @company BLOOSAT SA ( BSS )
   * @contact FEEL FREE TO CONTACT ME AT achillesog15@gmail.com only thanks
   */
  createNewCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.BLOOSAT__URL__CONNECTION}/create`, category)
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.BLOOSAT_GET}`)
  }

  getCategoryById(categoryID: any){
    return this.http.get(`${this.BLOOSAT_GET}/${categoryID}`)
  }
  _onUpdateCategories(categoryID: any, categoryData: any){
    return this.http.put(`${this.BLOOSAT_GET}/update/${categoryID}`,categoryData);

  }
  __onDeleteCategory(categoryId: any){

    return this.http.get(`${this.BLOOSAT_GET}/delete/${categoryId}`);
  }
}
