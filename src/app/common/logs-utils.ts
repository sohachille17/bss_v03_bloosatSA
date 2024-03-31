import { Observable } from "rxjs";







// Getting logs Observable
export function logsDataFunction(url: any){


  return Observable.create((observer: any) => {

    fetch(url).then(
      (response: any) => {

       return response.json()
      }
    ).then(body => {
      observer.next(body);
      observer.complete()
      console.log("Observable  Completed")
    }

    ).catch((err) =>{
      observer.error(err);

    })
  })

}
