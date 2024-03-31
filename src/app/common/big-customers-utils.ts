import { Observable } from "rxjs";
import { getToken } from "../services/local-storage.service";

export function bigCustomersUtils(url: any, bigCustomerData: any){

 return Observable.create((observer: any) => {

  const authToken = getToken();

  fetch(url, {
    method: 'POST',
    headers: {
      'ContentType': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(bigCustomerData)
  }).then(response => {

    return response.json()

  }).then( body =>{

    observer.next(body)
    console.log('Observable completed')
  }).catch(error => {

    observer.next(error)

  })

 })
}
export function bigCustomersCreateBill(url: any, bigCustomerDataData: any){

 return Observable.create((observer: any) => {

  const authToken = getToken();

  fetch(url, {
    method: 'POST',
    mode: "cors",
    headers: {
      'ContentType': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(bigCustomerDataData)
  }).then(response => {

    return response.json()

  }).then( body =>{

    observer.next(body)
    console.log('Observable completed')
  }).catch(error => {

    observer.next(error)

  })

 })
}




