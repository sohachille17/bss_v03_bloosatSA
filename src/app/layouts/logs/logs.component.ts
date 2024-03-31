import { Component, OnInit } from '@angular/core';
import { LogsServicesService } from 'src/app/services/logs-services.service';
import {Observable, map, shareReplay} from 'rxjs';
import { LOGS_STATUS } from 'src/app/password';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logsData: any;
  notSuspendedLogs: any = [];
  page:number =1;
  totalLength: any;

  logs: any = LOGS_STATUS;



  constructor(
    private logService: LogsServicesService,
    private toastre: ToastrService
    ){

  }

  ngOnInit(): void {

    const loggs$ = this.logService.onLoggs();


    const logsVal$ = loggs$.pipe(

        map(
          (logValue: any) => Object.values(logValue["data"]),
          //shareReplay()
        )
    )
    logsVal$.subscribe(

        (logs: any) => {
        this.logsData = logs.filter((souStatus: any) => souStatus.suspentionStatus === "suspended")

        console.log("LOGS",this.logsData)

        this.notSuspendedLogs = logs.filter((suspend: any) => suspend.suspentionStatus !== "suspended")
        this.notSuspendedLogs.reverse()
        console.log("NOT",this.notSuspendedLogs);


      }, (err:any) => {
        console.log(err.message)
        this.toastre.error('LOGS','ERROR BSS-LOGS')
      })

    // const logsVal$ =  this.logService.onGetLogs()
    // .pipe(

    //     map(
    //       (logValue: any) => Object.values(logValue["data"]),
    //       //shareReplay()
    //     )

    // );

    // // subscribing to get the data from

    // logsVal$.subscribe(
    //   logs => {
    //     this.logsData = logs.filter((souStatus: any) => souStatus.suspentionStatus === "suspended")

    //     console.log(this.logsData)
    //   }
    // )


    //end












    // this.logService.onGetLogs().subscribe((logsData: any) => {
    //   console.log(logsData)

    //   const {data} = logsData
    //   //console.log(data)

    //   this.logsData = data






    // })

  }

}
