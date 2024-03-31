import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { logos } from 'src/app/password';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { SouscriptionKAF } from 'src/app/models/souscriptionKAF';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { SouscriptionService } from 'src/app/services/souscription.service';
import { map, pipe } from 'rxjs';
import { STATUS_PAYMENT } from '../../password';
@Component({
  selector: 'app-souscription-kaf',
  templateUrl: './souscription-kaf.component.html',
  styleUrls: ['./souscription-kaf.component.css']
})
export class SouscriptionKAFComponent implements OnInit {

  souscriptionForm!: FormGroup;
  globalCustomerID: any;
  globalSouscriptionId: any;
  customerName: any;
  billRef: any = [];
  billID: any;
  customerSubscriptionData: Array<any> = []
  new30Day: any;
  subsStatus: any;
  onGoing: any;
  oss__KAF: any;
  editMode: any = false;
  sousTEXT: any = "Enregistrer"
  end_stop: any
  spinner: boolean = false;
  img = logos
  updatePaid: boolean = false
  usermail: any;

  PAYMENT_STATUS: any = STATUS_PAYMENT;

  STATUS__CHANE = {
    'paid':{

      "status":"success",
      "label": "payé"
    },

    'unpaid':{

      "status":"danger",
      "label": "non payé"
    },
  }

  OSS_STATUS: any = {
    'Active': {
      "status": "success",
      "label": "Active"
    },
    'Suspended': {
      "status": "danger",
      "label": "Suspendue"
    },
    'Expired': {
      "status": "secondary",
      "label": "EXPIRED"
    }
  }

  ON_GOING_STATUS = {
    'ongoing':{
      "status": "warning",
      "label": "en cours",
    },
    'pending':{
      "status": "primary",
      "label": "en attente",
    },
    'finished':{
      "status": "primary",
      "label": "finie",
    },
    'royalty':{
      "status": "secondary",
      "label": "royalties",
    },
    'terminated':{
      "status": "light",
      "label": " Mis en arret (PAUSE).",
    },


  }

  on_stop = {
    "isTerminated": {
      "status": "light",
      "label": "cycle arretez",
    }
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
    private localStorageService: LocalStorageService
  ){

  }


  ngOnInit(): void {
    // Refering to local
    this.usermail = this.localStorageService.getEmail()
    console.log(this.usermail)

    let customerID: any = this.route.snapshot.paramMap.get('id');
    //let customerID = this.route.snapshot.paramMap.get('id');
    //this.globalCustomerID = customerID;

    this.route.queryParams
    .subscribe(params => {
      console.log(params.id);
      customerID = params.id
      this.globalCustomerID = customerID

    });









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
      populationSouscription: this.formBuilder.control('', [Validators.required]),
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
  get populationSouscription(){
    return this.souscriptionForm.get('populationSouscription')
  }
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
      populationSouscription: this.souscriptionForm.value.populationSouscription,
      endingData: this.souscriptionForm.value.endingData,
      siteName: this.souscriptionForm.value.siteName,
      serviceType: this.souscriptionForm.value.serviceType,
      startingDate: this.souscriptionForm.value.startingDate,
      customerName:  this.customerName,
      customerId: this.globalCustomerID,
      situation: '',
      souscriptionStatus: '',
      subscriptionType: 'KAF'
    }
    const souscriptionKASSSSS: SouscriptionKAF = {


      serialNumber: this.souscriptionForm.value.serialNumber,
      populationSouscription: this.souscriptionForm.value.populationSouscription,
      endingDate: this.souscriptionForm.value.endingData,
      startingDate: this.souscriptionForm.value.startingDate,
      siteName: this.souscriptionForm.value.siteName,
      serviceType: this.souscriptionForm.value.serviceType,
      subscriptionId: this.souscriptionForm.value.subscriptionId,

    }




      // Edit  || Add with respect to conditions

      if(this.editMode === true){
        // if user want to edit === TRUE -> EDIT.
        this.onUpdateSouscriptionKAF(souscriptionKASSSSS)

        this.sousTEXT = "Modifier";
      }else{

        this.sousTEXT = "Enregistrer";
        // if user want to add === TRUE -> ADD.

        this.souscriptionService.makeSouscriptionKAF(souscriptionKAF).subscribe(sousDataKAF => {
          console.log(sousDataKAF);
          this.souscriptionForm.reset();
          this.getSunscriptionBYID();
          this.toastre.success("Souscription Created Successfully", 'BSS-SUCCESS')

        }, (error) => {
          console.log(error.error.message);
          let errorMessage = error.error.message
          this.toastre.error(`${errorMessage}`, '--BSS-ERROR')

        })

        console.log('new sous === >',souscriptionKAF)

      }



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


    this.billService.
    getCustomerBillsById(this.globalCustomerID)
    // .
    // pipe(
    //  map(
    //   (valueBill: any) => valueBill
    //   .filter(
    //     (result: any) => result.status === 0)
    //  )
    // )
    .subscribe(cusBill => {

      console.log("ts",cusBill)
      this.billRef = cusBill



    })

  }

  getSunscriptionBYID(){
    this.souscriptionService.getSouscriptionKAF(this.globalCustomerID).subscribe((cusSubscription: any) => {

    //  console.log(cusSubscription);
     const {customers_subscription, oss_subscription_status } = cusSubscription
     console.log("CUS",customers_subscription)
     console.log("OSS",oss_subscription_status)

      this.oss__KAF = oss_subscription_status
      this.customerSubscriptionData = customers_subscription
      this.spinner = true

      this.subsStatus = this.STATUS__CHANE;
      this.onGoing = this.ON_GOING_STATUS;
      this.end_stop = this.on_stop


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

  onEditeSouscriptionKaf(sousKafID: any){

    this.editMode = true;
    this.globalSouscriptionId = sousKafID;
    this.souscriptionService.getSouscriptionByIdUnique(this.globalSouscriptionId)
    // .pipe(
    //   map((result: any) => Object.values(result))
    // )
    .subscribe((souscriptionEditKAF: any) => {
      const {data} = souscriptionEditKAF
      this.souscriptionForm.patchValue({
        //patching the values to their respectiong formGroup!!

        serialNumber: data.serialNumber,
        startingDate: data.startingDate,
        endingData : data.endingDate,
        serviceType: data.serviceType,
        siteName: data.siteName,
        populationSouscription: data.populationSouscription,
        subscriptionId: data.subscriptionId,

      })
      console.log(data);
    })



  }

  onUpdateSouscriptionKAF(sousData: any){
    // update souscription kaf from API BACKEND.
    this.souscriptionService.updateSouscriptionKAF(sousData, this.globalSouscriptionId).subscribe(()=>{
      this.toastre.success("UPDATED SUCCESSFULLY!!")
      this.souscriptionForm.reset();
    }, (error)=>{
      this.toastre.error("BSS ERROR")
      console.log(error);

    })

  }


  endSouscriptionKAF(sousKAF_ID: any): void {


    Swal.fire({
      title: "Etes-vous sur de vouloir mettre fin à cette souscription? Vous n'allez plus pouvoir  revenir en arrière 😶😓😕",
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Oui`,
      cancelButtonText:`Non`
    }).then((result) => {
      if (result.isConfirmed) {
        //this.toastre.success(sousKAF_ID)
        //this.onEndSouscription()
        this.onsTOP(sousKAF_ID)

        Swal.fire({
          title: 'Desactivation reussi',
          icon: 'success'
      })
      }
    })

  }
  onsTOP(sousId: any){

    const stopPost = {
      subscriptionId: sousId
    }
    this.souscriptionService.stopKAF(stopPost).subscribe(() => {
      console.log("Data recieved");
      this.getSunscriptionBYID()

    })
  }


  onEndSouscription(){
    const endSous$ = this.souscriptionService.postSouscriptionEnd(
      {
        customerId: 1,
        subscriptionType: 'active'
      }
    )

    endSous$.subscribe()

  }






  // update status payment only for developers
  onSendUp(sousID: string){

    const subscriptionID = {
      subscriptionID: sousID
    }

    const postSousID$ = this.souscriptionService.sendSousID(subscriptionID)
    postSousID$.subscribe( () => {
      this.getSunscriptionBYID()
    })
    console.log(subscriptionID)



  }












}
