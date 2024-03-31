import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { SouscriptionKAF } from 'src/app/models/souscriptionKAF';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { SouscriptionService } from 'src/app/services/souscription.service';

@Component({
  selector: 'app-bloo-star',
  templateUrl: './bloo-star.component.html',
  styleUrls: ['./bloo-star.component.css']
})
export class BlooStarComponent {










  souscriptionForm!: FormGroup;
  globalCustomerID: any;
  customerName: any;
  billRef: any;
  billID: any;
  customerSubscriptionData: any
  new30Day: any;
  subsStatus: any;
  onGoing: any;
  oss__KAF: any

  STATUS__CHANE = {
    'paid':{

      "status":"success",
      "label": "paid"
    },

    'unpaid':{

      "status":"danger",
      "label": "unpaid"
    },
  }

  OSS_STATUS: any = {
    'Active': {
      "status": "success",
      "label": "Active"
    },
    'Suspended': {
      "status": "danger",
      "label": "Suspended"
    }
  }

  ON_GOING_STATUS = {
    'ongoing':{
      "status": "warning",
      "label": "on going",
    },
    'pending':{
      "status": "primary",
      "label": "pending",
    },
    'finished':{
      "status": "primary",
      "label": "finished",
    },
    'royalty':{
      "status": "secondary",
      "label": "royalty",
    },
    'terminated':{
      "status": "light",
      "label": "terminated",
    },

  }




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorage:LocalStorageService,
    private billService: BillServiceService,
    private souscriptionService: SouscriptionService,
    private toastre: ToastrService,
    private customerService: CustomersServiceService,
    private formBuilder: FormBuilder,
  ){

  }


  ngOnInit(): void {

    // let customerID = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.globalCustomerID = params.id;
    })

    // customer billing by customerID

    // customer billing by customerID

    this._initSouscriptionKAFForm();
    this.getCustomerDetails();
    this.getBillData();
    this.getSunscriptionBYID();
    //this.onGoingStatus();
  }


   _initSouscriptionKAFForm(): void{

    this.souscriptionForm = this.formBuilder.group({
      billReference: this.formBuilder.control('', [Validators.required]),
      serialNumber: this.formBuilder.control('', [Validators.required]),
      subscriptionId: this.formBuilder.control('', [Validators.required]),
      populationSouscription: this.formBuilder.control(''),
      endingData: this.formBuilder.control('', [Validators.required]),
      siteName: this.formBuilder.control('', [Validators.required]),
      serviceType: this.formBuilder.control('', [Validators.required]),
      startingDate: this.formBuilder.control('', [Validators.required]),
      id: this.formBuilder.control(''),
    })
  }


  get billReference(){
    return this.souscriptionForm.get('billReference')
  }
  get serialNumber(){
    return this.souscriptionForm.get('serialNumber')
  }
  get subscriptionId(){
    return this.souscriptionForm.get('subscriptionId')
  }
  // get populationSouscription(){
  //   return this.souscriptionForm.get('populationSouscription')
  // }
  get endingData(){
    return this.souscriptionForm.get('endingData')
  }
  get siteName(){
    return this.souscriptionForm.get('siteName')
  }
  get startingDate(){
    return this.souscriptionForm.get('startingDate')
  }
  get serviceType(){
    return this.souscriptionForm.get('serviceType')
  }
  get id(){
    return this.souscriptionForm.get('id')
  }

  onGetDate(){


    let todayDay:any = this.souscriptionForm.get('startingDate')?.value;

    const choosen_day_plus_30 = new Date(todayDay);
    choosen_day_plus_30.setDate( choosen_day_plus_30.getDate() + 31)

    const nextDate30 = choosen_day_plus_30.toISOString().split('T')[0]
    console.log({
      "1000":todayDay,
      "2000":nextDate30,

    })


    this.souscriptionForm.get('endingData')?.setValue(nextDate30)



  }


  onSubmitSouscriptionKAF(): void{

    const souscriptionKAF: SouscriptionKAF = {

      billReference: this.souscriptionForm.value.id,
      serialNumber: this.souscriptionForm.value.serialNumber,
      subscriptionId: this.souscriptionForm.value.subscriptionId,
      populationSouscription: "BLUESTAR",
      endingData: this.souscriptionForm.value.endingData,
      siteName: this.souscriptionForm.value.siteName,
      serviceType: this.souscriptionForm.value.serviceType,
      startingDate: this.souscriptionForm.value.startingDate,
      customerName:  this.customerName,
      customerId: this.globalCustomerID,
      situation: '',
      souscriptionStatus: '',
      subscriptionType: 'BLUESTAR'
    }

    this.souscriptionService.makeSouscriptionKAF(souscriptionKAF).subscribe(sousDataKAF => {
      console.log(sousDataKAF);
      this.souscriptionForm.reset();
      this.getSunscriptionBYID();
      this.toastre.success("Souscription Created Successfully", 'BSS-SUCCESS')

    }, (paymentError: any) => {
      //console.log(paymentError.error);
      const {error} = paymentError;
      console.log(error.error);

      Swal.fire({
        title: "Pay First !!!",
        text: `${error.error}`,
        icon: "question"
      });

    })

    console.log('new sous === >',souscriptionKAF)

  }

  getCustomerDetails(){

    this.customerService.getCustomerId(this.globalCustomerID).subscribe(cusTomerData => {
      let customData: any = cusTomerData

      if(customData != null){
        this.customerName = customData.username
      }
    })
  }

  getBillData(){


    this.billService.getCustomerBillsById(this.globalCustomerID).subscribe(cusBill => {

      this.billRef = cusBill


    })

  }

  getSunscriptionBYID(){
    this.souscriptionService.getSouscriptionBLUESTAR(this.globalCustomerID).subscribe((cusSubscription: any) => {

    //  console.log(cusSubscription);
     const {customers_subscription, oss_subscription_status } = cusSubscription
     console.log("CUS",customers_subscription)
     console.log("OSS",oss_subscription_status)

      this.oss__KAF = oss_subscription_status
      this.customerSubscriptionData = customers_subscription

      this.subsStatus = this.STATUS__CHANE;
      this.onGoing = this.ON_GOING_STATUS;


      this.toastre.success('Subscription get successfully','SUCCESS')
    }, (error) => {
      this.toastre.error('INTERNAL SERVER ERROR', 'BSS-ERROR')
      console.log(error);

    })
  }

  onSelectBills(){


    let billID = this.souscriptionForm.get('billReference')?.value
    //this.toastre.success(billID)
    this.billService.getOnebillById(billID).subscribe(newData => {
      let billValue: any = newData;



      this.souscriptionForm.get('siteName')?.setValue(billValue.invoice.websiteLink);
      this.souscriptionForm.get('id')?.setValue(billValue.invoice.billNumber);


    })

  }
  onPayment(){
    this.router.navigateByUrl(`/customer-payment?id=${this.globalCustomerID}`)
  }
















}
