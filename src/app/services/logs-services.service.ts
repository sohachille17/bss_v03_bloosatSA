import { Injectable } from '@angular/core';
import { environmentAPI } from '../environments/bloosat.environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { logsDataFunction } from '../common/logs-utils';


@Injectable({
  providedIn: 'root'
})
export class LogsServicesService  {

  BLOOSAT_SERVICE__URL = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION


  constructor(
    private http: HttpClient
  ) {



  }


  // getting all logs
  // onGetLogs(){

  //   return this.http.get(`${this.BLOOSAT_SERVICE__URL}subscriptions/suspension-log`)

  // }

  onLoggs(){

    return  logsDataFunction(`${this.BLOOSAT_SERVICE__URL}subscriptions/suspension-log`)
  }




  //const url = `${this.BLOOSAT_SERVICE__URL}subscriptions/suspension-log`




}
