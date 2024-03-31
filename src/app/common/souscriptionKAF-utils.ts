import { Observable } from "rxjs";
import { getToken } from "../services/local-storage.service";





// xporting memebers functions for SouscriptionKAF
//Souspention
export function SouscriptionKAFUtils(url: any, souscriptionData: any){

  const getTokeN = getToken();

  return Observable.create((observer: any) => {

    fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokeN}`
      },
      body: JSON.stringify(souscriptionData),

    }).then( response =>{
      return response.json()
    }).then((body: any) => {

      observer.next(body)
      console.log('Observer Completed')
    }).catch((error: any) => {

      if(error) observer.error(error)

    })

  })

}
