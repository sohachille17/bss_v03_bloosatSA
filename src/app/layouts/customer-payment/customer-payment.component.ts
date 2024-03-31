import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentM } from 'src/app/models/payment.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { environmentAPI } from 'src/app/environments/bloosat.environment';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { BillServiceService } from 'src/app/services/bill-service.service';
import Swal from 'sweetalert2';
import { logos } from 'src/app/password';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent implements OnInit{

  paymentForm!: FormGroup
  paymentMet: any
  image_path: any
  fileName = ''
  file: any;
  selectedImage: any = null
  selectedFiles: any
  currentFileUpload:any
  insertFiles:any
  imageDisplay: any;
  customerUniqueBills: any
  globalCustomerId: any;
  customerName: any;
  toDay: any;
  customerPayment: any
  totalLength: any;

  page:number =1
  BLOO__CONNECT = environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION

  STATUS_PAYMENT: any = {
    0:{
      "label": "(NON-PAYER)"
    },
    1:{
      "label": "(PAYER)"
    }
  }

  constructor(
    private toastre: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentServiceService,
    private localStorage: LocalStorageService,
    private customerService: CustomersServiceService,
    private billService: BillServiceService



  ){

  }
  ngOnInit(): void {


    this.toDay = new Date()

    //let customerID = this.route.snapshot.paramMap.get('id');


    this.route.queryParams
    .subscribe(
      paramsId =>
      this.globalCustomerId = paramsId.id
    )


    this.customerService.getCustomerId(this.globalCustomerId).subscribe(customerData => {
      let dataCu: any
      dataCu = customerData
      this.customerName = dataCu.username;
      this.paymentForm.get('customerId')?.setValue(dataCu.id)
    },(error)=>{
      this.toastre.error(error)
    })

    this.__onInitPaymentForm()
    this.onGetBillID();
    this.onGetallPaymentsbyID()
  }


  onGetBillID(){

    this.billService.getCustomerBillsById(this.globalCustomerId).subscribe(uniqueBill => {
      console.log("====>>>>",uniqueBill)
      this.customerUniqueBills = uniqueBill

    })
  }

  onFileChange(event: any){

    //this.selectedImage =<File> event.target.files[0];
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedImage = file
  }
  }

  __onInitPaymentForm(){


    this.paymentForm = this.formBuilder.group({
      customerId: new FormControl('', [Validators.required]),
      payementDate: new FormControl('', [Validators.required]),
      siteName: new FormControl('', [Validators.required]),
      billReference: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      payementAttachment1: new FormControl('', [Validators.required]),
      transactionNumber1: new FormControl('', [Validators.required]),
      transactionNumber2: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      id: new FormControl(''),


    })
  }
  get customerId(){
    return this.paymentForm.get('customerId');
  }
  get payementDate(){
    return this.paymentForm.get('payementDate');
  }
  get siteName(){
    return this.paymentForm.get('siteName');
  }
  get billReference(){
    return this.paymentForm.get('billReference');

  }
  get paymentMethod(){
    return this.paymentForm.get('paymentMethod');
  }

  get transactionNumber1(){
    return this.paymentForm.get('transactionNumber1');
  }
  get transactionNumber2(){
    return this.paymentForm.get('transactionNumber2');
  }
  get payementAttachment1(){
    return this.paymentForm.get('payementAttachment1')
  }
  get comment(){
    return this.paymentForm.get('comment');
  }
  get amount(){
    return this.paymentForm.get('amount');
  }
  get id(){
    return this.paymentForm.get('id');
  }


  onChange(event: any){

    this.paymentMet = event.target.defaultValue;
    console.log(this.paymentMet);


  }

  onFileChanged(event:any) {



    const file = event.target.files[0];
    if (file) {

      this.paymentForm.patchValue({payementAttachment1: file})
      this.paymentForm.get('payementAttachment1')?.updateValueAndValidity();

      this.selectedFiles = file
    }
  }

  onSavePayment(){





var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", `Bearer ${this.localStorage.getToken()}`);

const formdata = new FormData();
formdata.append("payementAttachment1", this.selectedFiles);
formdata.append("customerId", this.paymentForm.value.customerId);
formdata.append("payementDate", this.paymentForm.value.payementDate);
formdata.append("siteName",this.paymentForm.value.siteName);
formdata.append("billReference",this.paymentForm.value.id);
formdata.append("amount", this.paymentForm.value.amount);
formdata.append("paymentMethod", this.paymentForm.value.paymentMethod);
formdata.append("comment", this.paymentForm.value.comment);

formdata.append("transactionNumber1", this.paymentForm.value.transactionNumber1);

console.log(this.paymentForm.value)


fetch(`${this.BLOO__CONNECT}payments`,  {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow',


})
  .then(response => response.text())

  .then((rawResult:any) =>{
    // console.log(result, '--------');
    const result = JSON.parse(rawResult)
    if (result.error) {

    // this.toastre.success(`${result.error}`)

    Swal.fire({
      icon: 'error',
      title: `${result.error}`,
      text: 'Something went wrong!',
      footer: '<a href="">BSS ERROR</a>'
    })
     console.log(result.error);

    }else{
      //this.paymentForm.reset()

      this.toastre.success(`CREATED SUCCESSFULLY!!`, 'BSS-SUCCESS')
      this.onGetBillID()
      this.onGetallPaymentsbyID();
    }
  }).catch( error => {
    this.toastre.error(`${error.error}`);
    console.log(error.error);

  })



  }



  get productForm() {
    return this.paymentForm.controls;
  }

  onGetallPaymentsbyID(){

    this.paymentService.getPaymentsByID(this.globalCustomerId).subscribe(customPayment => {
      this.customerPayment = customPayment
      console.log('BSS --> NEW',this.customerPayment);


    })
  }

  onLoadPayment(id: any){
    this.router.navigateByUrl(`/payment-receipt/${id}`);
  }

  selectPayment(): void {

    // Here we get billUnique ID
    let billID = this.paymentForm.get('billReference')?.value
    this.toastre.success(billID)

    //we use the reference value collected from billID to
    // set them on their respective fields

    // we collect those respective bills by ids

    this.billService.getOnebillById(billID).subscribe((uniquebillsID) => {
      console.log(" ...VALUE HERE ==>",uniquebillsID)
      let billData: any
      billData = uniquebillsID

      this.paymentForm.get('siteName')?.setValue(billData.invoice.websiteLink)
      this.paymentForm.get('amount')?.setValue(billData.invoice.montant_ttc);
      this.paymentForm.get('id')?.setValue(billData.invoice.billNumber)
    })


  }




}
