import { Component } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { logos } from 'src/app/password';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { SouscriptionKAF } from 'src/app/models/souscriptionKAF';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { SouscriptionService } from 'src/app/services/souscription.service';
import { map, Observable, pipe } from 'rxjs';
import { STATUS_PAYMENT,ON_GOING_STATUS_BIG_DETAILS, OSS_STATUS ,STATUS__CHANE} from '../../password';
import { BigSubscriptionService } from 'src/app/services/big-subscription.service';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';
import { SiteServiceService } from 'src/app/services/site-service.service';
@Component({
  selector: 'app-subscription-big',
  templateUrl: './subscription-big.component.html',
  styleUrls: ['./subscription-big.component.css']
})
export class SubscriptionBigComponent {


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
  siteDetails: any;
  isedit: boolean = false
  collectionsData: any;
  site_data: any = [];
  siteForm!: FormGroup;


  OSS_S:any = OSS_STATUS

  PAYMENT_STATUS: any = STATUS_PAYMENT;
  ON_BIG_STATUS: any = ON_GOING_STATUS_BIG_DETAILS
  appen: string = "text"
  siteData!: Observable<any>

  STATUS__CHANE: any = {
    'paid':{

      "status":"success",
      "label": "payé"
    },

    'unpaid':{

      "status":"danger",
      "label": "non payé"
    },
  }






  on_stop = {
    "isTerminated": {
      "status": "light",
      "label": "cycle arretez",
    }
  }

  // sous Variables
  bigSubscriptionData: Array<any> = []





  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorage:LocalStorageService,
    private billService: BillServiceService,
    private souscriptionService: SouscriptionService,
    private toastre: ToastrService,
    private customerService: CustomersServiceService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    //
    private bigSubscription: BigSubscriptionService,
    private bigCustomerService: BigCustomerServiceService,
    private siteService: SiteServiceService,
    private toastr: ToastrService

  ){

  }


  ngOnInit(): void {
    // Refering to local
    this.usermail = this.localStorageService.getEmail()
    console.log(this.usermail)

    //let customerID: any = this.route.snapshot.paramMap.get('id');
    //let customerID = this.route.snapshot.paramMap.get('id');
    //this.globalCustomerID = customerID;

    this.route.queryParams
    .subscribe(params => {
      console.log(params.id);
      let customerID = params.id
      this.globalCustomerID = customerID

    });



    // customer billing by customerID

    // customer billing by customerID

    this._initSouscriptionKAFForm();
    this.getCustomerDetails();
    this.getBillData();
    this.getSunscriptionBYID(this.globalCustomerID)

    //this.onGoingStatus();
    this.getSiteByCustomerId(this.globalCustomerID)


  }
  getSiteByCustomerId(customerId: any){
    this.siteService.getSiteData(customerId).pipe(

      map((siteValue:any) => siteValue.
      filter((sites:any) => sites.status === 'active'))
    )
    .subscribe((site: any)=>{
      console.log("SS+++",site)
      this.site_data = site
    })
  }
  onChangeSite(index: any){

    this.siteDetails = this.souscriptionForm.get('sites_item') as FormArray
    this.siteForm = this.siteDetails.at(index) as FormGroup
    let sitenameId:any = this.siteForm.get("siteId")?.value
    console.log("TD",sitenameId)
    this.siteService.getSiteID(sitenameId).pipe(
      map((siteValue: any) => Object.values(siteValue) ),
      map((val:any) => val[0])
    )
    .subscribe((site: any)=>{
      console.log("sitesss", site)

     this.siteForm.get('siteName')?.setValue(site.name)

    })
  }
  onGetiSiteID(subscriptionID: any){
    this.siteData = this.bigSubscription.getSiteBySubscriptionID(subscriptionID)

  }


   _initSouscriptionKAFForm(): void{

    this.souscriptionForm = this.formBuilder.group({
      billReference: this.formBuilder.control('', [Validators.required]),
      endingData: this.formBuilder.control('', [Validators.required]),
      serviceType: this.formBuilder.control('', [Validators.required]),
      startingDate: this.formBuilder.control('', [Validators.required]),
      // id: this.formBuilder.control(''),

      //items quantities here
      sites_item: this.formBuilder.array([])
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
  // get id(){
  //   return this.souscriptionForm.get('id')
  // }

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


    // Manage site details



    addProducts(){

      this.siteDetails = this.souscriptionForm.get("sites_item") as FormArray;
      //this.siteDetails.push(this.GenerateRows());
      let billRef = this.souscriptionForm.get('billReference')?.value
      // let type = this.souscriptionForm.get('type')?.value

      if((billRef != null && billRef != '') || this.isedit){
         this.siteDetails.push(this.GenerateRows());
         this.toastr.info('New Site created')
        }else{
         this.toastr.warning('Please You need to select a BILL REF First ','Validation')
       }
    }
    onRemoveProduct(i:any){

      Swal.fire({
        title: `Etes-vous sur de vouloir supprimer le site? Vous n'allez plus pouvoir  revenir en arrière 😶😓😕-${i+1}?`,
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Supprimer, oui !!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ivProduct.removeAt(i);
          // this.toastr.info(`Product ${i+1} removed`,"INFO");
          // this.summaryCalculation()

          Swal.fire(
            'Supprimer!',
            `Site ${i+1} 000`,
            'success'
          )
        }
      })





    }


    get ivProduct(){
      return this.souscriptionForm.get("sites_item") as FormArray;
    }

    GenerateRows(){

      return this.formBuilder.group({
        //service_id: this.formBuilder.control(''),
        siteId: this.formBuilder.control('', [Validators.required]),
        siteName: this.formBuilder.control('',[Validators.required]),
        population: this.formBuilder.control('', [Validators.required]),
        serverId: this.formBuilder.control(0, [Validators.required]),
        type: this.formBuilder.control('', [Validators.required]),
        serialNumber: this.formBuilder.control('', [Validators.required]),

      })

    }



  onSubmitSouscriptionKAF(): void{

    this.collectionsData = this.siteDetails



    const souscriptionGRAND_COMPTE = {

      billReference: this.souscriptionForm.value.billReference,



      endingData: this.souscriptionForm.value.endingData,

      serviceType: this.souscriptionForm.value.serviceType,
      startingDate: this.souscriptionForm.value.startingDate,
      customerName:  this.customerName,
      customerId: this.globalCustomerID,
      situation: '',
      souscriptionStatus: '',
      sites_item: this.collectionsData.value

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

        //console.log("set test",souscriptionGRAND_COMPTE.sites_item,this.site_data)
        const input_site_form = souscriptionGRAND_COMPTE.sites_item
        const site_length = this.site_data

        const formSite =  input_site_form.map((site: any) => Number(site.siteId))
        const siteLen = site_length.map((site: any) =>site.id)

        let setOne = new Set(formSite)
        let setTwo = new Set(siteLen)
        //console.log(setOne, "set", setTwo)

        const areSetsEqual = (setOne:any, setTwo:any) => setOne.size === setTwo.size && [...setOne].every(value => setTwo.has(value));

        //console.log("ans");

        const answer  = areSetsEqual(setOne,setTwo)

       if(!answer){
          this.toastr.error("Desolee les sites renseigner dans la souscription ne correspondents pas au nombres de sites du clien desolee")

        }else if(answer){
          console.log(souscriptionGRAND_COMPTE)
          this.souscriptionForm.reset()
          this.siteForm.reset()


        const subsHttp$ = this.bigSubscription.createBigSubscription(souscriptionGRAND_COMPTE)

        subsHttp$.subscribe((newSubscription) => {
          this.souscriptionForm.reset()
          this.siteForm.reset()
          console.log(newSubscription)
        }, (error: any) => {
          if(error) console.log(error)
          this.toastr.error(`${error.message}`,'ERROR')
        })
        }







      }



  }

  getCustomerDetails(){

    this.bigCustomerService.getCustomerId(this.globalCustomerID).subscribe(cusTomerData => {
      let customData: any = cusTomerData

      if(customData != null){
        this.customerName = customData.username
      }
    })
  }

  getBillData(){


    this.bigCustomerService.getBigCustomerBill(this.globalCustomerID)
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

  // get customer big-subscription bt customer ID
  getSunscriptionBYID(customerID: string){
    console.log(customerID)

    const subscriptionHttp$ = this.bigSubscription.getSubscriptionByCustomerID(customerID)
    subscriptionHttp$.subscribe((bigSubsData: any) => {
      console.log("BIG",bigSubsData.customers_subscription)
      this.bigSubscriptionData = bigSubsData.customers_subscription
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
    this.router.navigateByUrl(`/big-payments?id=${this.globalCustomerID}`)
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





  onEndSouscription(){
    const endSous$ = this.souscriptionService.postSouscriptionEnd(
      {
        customerId: 1,
        subscriptionType: 'active'
      }
    )

    endSous$.subscribe()

  }



















}
