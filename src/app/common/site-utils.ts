import { Observable } from "rxjs";
import { getToken } from "../services/local-storage.service";







export function postCustomerSite(url: string, siteData: any){


  const token = getToken();

  return Observable.create((observer: any) => {

    fetch(url, {
      method: 'POST',
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(siteData),

    }).then( (response) => {
      return response.json()
    }).then(() => {
      observer.next();
      console.log('Observer ended');
    }).catch((error) => {
      if(error) observer.error(error)
      console.log(error);

    })
  })
}

export function getSiteData(url: string, customerID: any){
  const token = getToken();
  // console.log('TOKEN --->',token);

  return Observable.create((observer: any) => {

    fetch(`${url}/${customerID}`,
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


export function updateCustomerSite(url: string, siteData: any){


  const token = getToken();

  return Observable.create((observer: any) => {

    fetch(url, {
      method: 'put',
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(siteData),

    }).then( (response) => {
      return response.json()
    }).then(() => {
      observer.next();
      console.log('Observer ended');
    }).catch((error) => {
      if(error) observer.error(error)
      console.log(error);

    })
  })
}
