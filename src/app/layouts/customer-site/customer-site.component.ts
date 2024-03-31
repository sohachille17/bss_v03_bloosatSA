import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, filter, map, shareReplay, tap } from 'rxjs';
import { ItemBundle } from 'src/app/models/itemBundle';
import { Site } from 'src/app/models/site.model';
import { logos } from 'src/app/password';
import { BlooServiceService } from 'src/app/services/bloo-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { SiteServiceService } from 'src/app/services/site-service.service';
import Swal from 'sweetalert2';
import { Status } from './../../models/status.model';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { BigCustomerServiceService } from 'src/app/services/big-customer-service.service';
@Component({
  selector: 'app-customer-site',
  templateUrl: './customer-site.component.html',
  styleUrls: ['./customer-site.component.css']
})
export class CustomerSiteComponent implements OnInit {

  /**
   *
   * @author SOH ACHILLE   ->(achillesoh15@gmail.com) ->(fullstack developer)
   * @company BLOOSAT SA
   *
  **/


  bigCusBillForm!: FormGroup;
  siteData: Array<any> = [];

  bundleData!: Observable<any>; // reactive design programming
  // bundleData: Array<any> = []; // imperative programming
  searchTextL: any = ''
  siteForm!: FormGroup;
  itemsForm!: FormGroup;
  isLoading: boolean = false;
  customerId: any;
  appen: string = "text"
  globalCustomerID!: any;
  product__service: any;
  globalSiteID: any;
  type_prod_or_ser: any;
  bundleIsLoading: boolean = false;
  siteID__toggler: any;

  totalSum: any;
  spinner: boolean = false;
  onEdit!: boolean;
  siteTitle: string = "Ajouter Site"
  onBtnStatus: string = "Ajourter"
  img = logos;
  // bundle edite variables
  onBundleEdite: boolean = false;
  onBundleTxtBtn: string = "Ajouter";
  globalCustomerName!: string;
  bundle_globalID!: string


  colorSwitch: boolean = true;
  penddingColor: boolean = true
  btnStatus: boolean = true;

  globalSiteId: any ;









  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private routes: ActivatedRoute,
    private siteService: SiteServiceService,
    private productService: ProductServiceService,
    private blooService: BlooServiceService,
    private bigCustomer: BigCustomerServiceService

    ){



  }
  ngOnInit(): void {



   // this.calculatorAmount()

    this.onGetSite();

    this.__onInitSiteForm();
    //this.customerId = this.routes.snapshot.paramMap.get('id');
    this.routes.queryParams.subscribe(params =>{
      this.customerId = params.id

    })

    this.getProductAll()

    this.__onBundleFormItems()
    //this.getBundleBySiteID()

    this.___initCreateBigCustomerBill()


    this.bigCustomer.getCustomerId(this.customerId).subscribe(
      (customer: any)=>{
        this.globalCustomerName = customer.name
      }
    )

  }


  __onInitSiteForm(){

    this.siteForm = this.formBuilder.group({

      siteLocation: new FormControl('', [Validators.required]),
      siteName: new FormControl('rr', [Validators.required]),
      siteDescription: new FormControl('',[Validators.required]),
      tva: new FormControl(1, [Validators.required])



    });
  }
  onset(){
    this.siteForm.patchValue({tva: 19.25})
  }




  get siteLocation(){
    return this.siteForm.get('siteLocation');
  }
  get siteName(){
    return this.siteForm.get('siteName');
  }
  get siteDescription(){
    return this.siteForm.get('siteDescription')
  }
  get tva(){
    return this.siteForm.get('tva');
  }



  // Bundle form initialization
  __onBundleFormItems(){

    this.itemsForm = this.formBuilder.group({

      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      total: new FormControl('', [Validators.required]),
      prod_id: new FormControl('', [Validators.required])


    })

  }
  ___initCreateBigCustomerBill(){
     this.bigCusBillForm =this.formBuilder.group({
      billingDate: new FormControl('', [Validators.required])
     })
  }

  // getGroup bundleForm submissions

  get name(){
    return this.itemsForm.get('name');//id

  }
  get price(){
    return this.itemsForm.get('price');
  }
  get quantity(){
    return this.itemsForm.get('quantity');
  }
  get total(){
    return this.itemsForm.get('total');
  }
  get prod_id(){
    return this.itemsForm.get('prod_id')//name
  }
  ID(id: any){
    console.log(id);

  }

  // saving bunleItems

  onSaveBundle(){

    const bundleItem: ItemBundle = {

      name: this.itemsForm.value.prod_id,
      price: String(this.itemsForm.value.price) ,
      quantity: this.itemsForm.value.quantity,
      total: this.itemsForm.value.total,
      siteId:this.globalSiteID,
      type: this.type_prod_or_ser,
      productId: this.itemsForm.value.name


    }
    if(this.onBundleEdite){


      this.updateBundle__(this.bundle_globalID, bundleItem)
      // update site bundle
      this.toastr.info("Still working on", "Informative")
      console.log("We're still working on this functionality sorry!!")


    }else{

      if(bundleItem){
        this.bundleIsLoading = true
      }

      // Connecting To Our BLOO API

      const createBundle$ = this.siteService.createNewBundleItem(bundleItem);
      createBundle$.subscribe(() =>{

        Swal.fire({
          title: 'Created Successfully',
          icon: 'success'
      })
      this.toastr.success('Bundle Created!!')
      this.itemsForm.reset()
      this.bundleIsLoading = false;
      this.getBundleBySiteID()

      }, (error:any) =>{
        this.toastr.error("Server Error!!")
        console.log(error);

      })

      //console.log(bundleItem)


    }




  }




  //onCollect Site ID

  onGetSiteID(siteID: any){

    //console.log(siteID)
    this.globalSiteID = siteID
    this.onBundleEdite = false
    console.log(this.onBundleEdite)
    this.onBundleTxtBtn = "Ajouter"
    //this.itemsForm.reset();
    this.__onBundleFormItems()

  }
  onGetSiteIDBYToggller(siteID: any){
    console.log(siteID);
    this.siteID__toggler = siteID
    this.getBundleBySiteID()



  }
  // getAllProduct
  getProductAll(){
    const prod_service$ = this.blooService.__product_and_services()
    prod_service$.subscribe(data =>{
     // console.log(data)
      this.product__service = data
    })
  }
  // getProductByID
  onProductgetByID(){

    const prodID_service = this.itemsForm.get('name')?.value;
    //console.log(prodID)

    this.productService.getProductById(prodID_service).subscribe((prodID_serv: any)=>{
     // console.log(prodID_serv)

      this.itemsForm.get('price')?.setValue(prodID_serv.amount)
      this.itemsForm.get('prod_id')?.setValue(prodID_serv.name)

      let price:any = this.itemsForm.get('price')?.value
      let quantity:any = this.itemsForm.get('quantity')?.value

      const type: any = prodID_serv.type
      this.type_prod_or_ser = type

      let total = price * quantity;

      this.itemsForm.get('total')?.setValue(total)

    })



  }
  onCalculatePrice_quantity(){


    const prodID_service = this.itemsForm.get('name')?.value;
    //console.log(prodID)

    this.productService.getProductById(prodID_service).subscribe((prodID_serv: any)=>{


      let price:any = this.itemsForm.get('price')?.value
      console.log(typeof price, price,this.itemsForm)
      let quantity:any = this.itemsForm.get('quantity')?.value

      const type: any = prodID_serv.type
      this.type_prod_or_ser = type

      let total = price * quantity

      this.itemsForm.get('total')?.setValue(total)

    })
  }



  // saving site creation
  onSaveSite(){





    // initialize our data object model = {data}
    const sitedata : Site ={
      location: this.siteForm.value.siteLocation,
      name: this.siteForm.value.siteName,
      description: this.siteForm.value.siteDescription,
      tva: this.siteForm.value.tva,
      customerId: this.customerId
    }

    if(this.onEdit === true){

      const siteHttp4$ =this.siteService.updateSiteByCustomerID(this.globalSiteID, sitedata)
      siteHttp4$.subscribe((siteValue: any) => {
          Swal.fire({
            title: 'UPDATED😉',
            icon: 'success'
        })
          console.log(siteValue)
          this.onGetSite()
        },(error: any)=>{
          this.toastr.error('ERROR', `${error.message}`)
        })
    }else{


    // check if our data  data ? spinner === true : spinner === default
    if(sitedata){
      this.isLoading = true;
      console.log(sitedata);
    }

    // connect to service API via Site service  and insert our data
    const sitePost$ = this.siteService.createSite(sitedata)
    sitePost$.subscribe( () => {
      this.toastr.success('Site Created Successfully','Success', {
        timeOut: 5000
      })
      this.isLoading = false
      this.siteForm.reset();
      this.onGetSite()
    }, (error: any) => {
      console.log(error)
      this.toastr.error('Internal Server Error!!')
    })



    }




  }


  getBundleBySiteID(){

    //.1
    // for Reactive design (Imperatiuve design programming)
    // const getBundle$ = this.siteService.getBundleById(this.siteID__toggler);
    // getBundle$.subscribe((bundles: any) => {
    //   //console.log('======>',bundles);
    //   this.bundleData = bundles



    // })

    // .2 for Reactive design (Reactive programming)
    const getBundle$ = this.siteService.getBundleById(this.siteID__toggler)
    .pipe(
      tap(() => console.log('SHAREREPLAY DONE!!')),
      shareReplay() // Close request from response !! DONE  !!
    )
    this.bundleData = getBundle$


  }



  // Loading Site Data from API -> /BLOOSAT/API/sites
  onGetSite(){


    // decleared global customer ID
     this.routes.queryParams.subscribe(params =>{
      this.globalCustomerID = params.id
    })
    console.log("ID",this.globalCustomerID)
    const getSite$ = this.siteService.getSiteData(this.globalCustomerID)

    getSite$.subscribe((dataSite: any) => {
      this.siteData = dataSite



     console.log(this.siteData)
     console.log(this.siteData)
      //console.log(this.siteData.length)
    })
  }






  onBack(){
    this.router.navigateByUrl('/big-customers');
  }

  onRemove(siteId: string, siteStatus: string){

    Swal.fire({
      title: siteStatus === 'active' ? ' Etes vous sure de vouloir desactiver le site': 'Etes vous sure de vouloir activer le site',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Oui`,
      cancelButtonText:`Non`
    }).then((result) => {
      if (result.isConfirmed) {
        const siteHttp$ =  this.siteService.updateSiteStatus(siteId, siteStatus)
        siteHttp$.subscribe(()=>{
          this.onGetSite()
        })

        Swal.fire({
          title: siteStatus === 'active' ?  'Desactiver': 'Activer',
          icon: 'success'
      })
      }
    })
  }

  // remove site


  // on Edit Site  (SECTION SITE START HERE)
  onEditeSite(siteId: any){
    this.globalSiteID = siteId
    this.onEdit = true
    console.log(this.onEdit)
    this.siteTitle = "Modifier Site"
    this.onBtnStatus = "Modifier"
    const siteId$ = this.siteService .getSiteID(siteId);
    siteId$.pipe(
      tap(() => console.log("SHARED REPLAY") ),
      shareReplay(),
      map(
        (value: any) => Object.values(value),
      ),
      map((value:any) => value[0])

      ).subscribe((siteResult: any) => {
      console.log(siteResult)

       if(siteResult != null){
         this.siteForm.patchValue({
          siteLocation: siteResult.location,
          siteName: siteResult.name,
          siteDescription: siteResult.description

         })
      }
      }
    )
  }
  onChangeMode(){
    this.onEdit = false
    console.log(this.onEdit)
    this.siteTitle = "Ajourter Site"
    this.onBtnStatus = "Ajourter"
    this.siteForm.reset()
    this.onset()

  }


    // on Edit Site  (SECTION SITE START HERE)



    //on Edite Bundle form site(SECTION SITE START HERE)

    onEditeBundle(bundleId: any): void {
      this.bundle_globalID = bundleId
      this.onBundleEdite = true
      console.log(this.onBundleEdite)
      this.onBundleTxtBtn = "Modifier";
      const httpBundle$ = this.siteService.getBundleID(bundleId)
      const bundle$ =  httpBundle$.pipe(
        shareReplay(),
        tap(() => console.log("onBundle shared replay") ),
        map(
          (value: any) => Object.values(value)
        ),
        map(
          (result: any) => result[0]
        )
      )

      bundle$.subscribe((bundleData: any) => {
        if(bundleData != null){
          this.itemsForm.patchValue({
            name: bundleData.productId,
            total: bundleData.total,
            price: bundleData.price,
            quantity: bundleData.quantity,
            prod_id: bundleData.productId

          });
        }
        console.log("BUNDLE-DATA", bundleData);
      })





    }

    updateBundle__(bundleID: string, bundleData: any){
      this.siteService.updateBundle(bundleID, bundleData).subscribe(
        (newBundle) => {
          this.toastr.success("Bundle Updated successfully")
          console.log(newBundle)
        }
      ), (error: any) => {
        console.log(error)
        this.toastr.error(`Message :${error.message}`)
      }}

    createABill(){

     // console.log(this.customerId)
      const billData = {
        customerId: this.customerId,
        billDate: this.bigCusBillForm.value.billingDate,
        billType: 'proforma'
      }
      console.log(billData)


      const httpbigBill = this.siteService.createNewCustomerBill(billData)
      // httpbigBill.pipe(
      //   catchError(err => console.log(err))
      // )
      httpbigBill.subscribe(() => {
        Swal.fire({
          title: 'BILL CREATED SUCCESSFULLY!!',
          icon: 'success'
      })
      }, (error: any) =>{
        console.log(error)
        Swal.fire({
          title: 'PROCESS FAILD',
          icon: 'error'
      })
      })
    }

    get billingDate(){

      return this.bigCusBillForm.get("billingDate")
    }


}
