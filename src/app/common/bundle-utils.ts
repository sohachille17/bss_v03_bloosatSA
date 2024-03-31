import { Observable } from "rxjs";
import { getToken } from "../services/local-storage.service";


// here we post a new Bundle
export function makeBundle(url: string, bundleData: object){

  const token = getToken();

  return Observable.create((observer: any) => {

    fetch(url, {
      method: 'POST',
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bundleData)

    }).then((response) =>{
      return response.json();
    }).then(() => {

      observer.next();
      console.log("Observable ended!!")
    }).catch((error) =>{
      if(error) observer.error(error)
    })

  })
}


// Here we get the bundle by site ID
export function getBundleBYID(url: string, siteID: any){
  const token = getToken();
  // console.log('TOKEN --->',token);

  return Observable.create((observer: any) => {

    fetch(`${url}/${siteID}`,
      {
        method: 'GET',
        mode: "cors", // no-cors, *cors, same-origin
        headers: {

          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'

        }

      }).then(
      (response: any) => {
        return response.json();
      }
    ).then((body) => {

      observer.next(body);


    }

    ).catch(error =>{ if(error) observer.error(error) } )
  })

}
// Here we get the bundle by bundle ID
export function getUniqueBundle(url: string, siteID: any){
  const token = getToken();
  // console.log('TOKEN --->',token);

  return Observable.create((observer: any) => {

    fetch(`${url}/${siteID}`,
      {
        method: 'GET',
        mode: "cors", // no-cors, *cors, same-origin
        headers: {

          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'

        }

      }).then(
      (response: any) => {
        return response.json();
      }
    ).then((body) => {

      observer.next(body);


    }

    ).catch(error =>{ if(error) observer.error(error) } )
  })

}
