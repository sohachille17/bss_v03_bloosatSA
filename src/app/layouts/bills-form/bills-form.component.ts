import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { Bills } from 'src/app/models/bills.model';
import Swal from 'sweetalert2';
import { STATUS_UTILES } from './../../password';
import { BlooServiceService } from 'src/app/services/bloo-service.service';

@Component({
  selector: 'app-bills-form',
  templateUrl: './bills-form.component.html',
  styleUrls: ['./bills-form.component.css']
})
export class BillsFormComponent implements OnInit{

  //invoiceForm!: FormGroup;
  itemsForm!: FormGroup<any>;
  invoiceDetails!: FormArray<any>;
  //variables templating
  productData: any;
  customerData: any;
  type: any
  total__f: any = 0;
  amount___total: any = 0;
  final_tax_amount: any = 0;
  total__net: any = 0;
  discount__amount = 0;
  companyName: any = "BLOOSAT SA"
  date__now!: any
  TTC_AMOUNT_CALC: any = 0;
  //
  collectionsData: any
  invoiceForm!:FormGroup<any>
  droit_daccises!: any;
  total_sou: any = 0;
  receiptRecentData: any[] = []
  //value_s: any
  serviceData: any;

  value_s: any = "danger";
  globalServiceId: any;

  // editMode for invoice
  pageTitle: any;
  editInvoiceMode: any;
  isedit:any = false;
  editDetailsItems: any;
  uniqueIDFAC: any;
  clientStatus: any = false;
  product_service: any;
  product_and_service: any = "Produits"
  constructor(
    // init service component to be use
    private billService: BillServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductServiceService,
    private customerService: CustomersServiceService,
    private invoiceService: BillServiceService,
    private serviceBloosat: BlooServiceService
  ){
      let now  = new Date()
      let date = now.getDate()
      let month = now.getMonth()
      let year = now.getFullYear()
      //let time = now.getTime()

      this.date__now = `${date}-${month}-${year}`




  }



  ngOnInit(): void {


    // init call
    this.idUnique()
    this.getCustomer()
    this.getProduct()
    this.___iitTest()
    this.getService()
    this.__onDisplatLastData()
    this.editInvoiceMode = this.route.snapshot.paramMap.get('id');
    if(this.editInvoiceMode != null){
      this.pageTitle = "Edit invoice"
      this.isedit = true
      /*  SERVICE TO CAME WAIT!!!!  */
      this.setEditInfo(this.editInvoiceMode)
    }
    //this.summaryCalculation()
    this.__product__and__service()

  }
  idUnique(){
    var id = new Date().getTime().toString();
    this.uniqueIDFAC = id;
    console.log(id);

  }
  onChange(event: any){
   console.log(event.target.checked);
   this.clientStatus = event.target.checked;
   this.toastr.success("STATUS CHANGED", "BSS-STATUS")



  }

  __product__and__service(){
    this.serviceBloosat.__product_and_services().subscribe(dataPS => {
      console.log('lkglkgkyh',dataPS);
      this.product_service = dataPS;

    })
  }

  ___iitTest(){

    this.invoiceForm = this.formBuilder.group({
      customer_id: this.formBuilder.control('', [Validators.required]),
      customerName: this.formBuilder.control('', [Validators.required]),
      dateLimit: this.formBuilder.control('', [Validators.required]),
      billNumber: this.formBuilder.control( '', [Validators.required]),
      compantName: this.formBuilder.control('', [Validators.required]),
      serviceAddress: this.formBuilder.control({value: 'Bloosat dragage', disabled:false}, [Validators.required]),
      postalAddress: this.formBuilder.control({value: 'BP 750', disabled:false}, [Validators.required]),
      phoneNumber: this.formBuilder.control('', [Validators.required]),
      customerEmailAddress: this.formBuilder.control('', [Validators.required]),
      websiteLink: this.formBuilder.control('', [Validators.required]),
      type: this.formBuilder.control('', [Validators.required]),
      currency: this.formBuilder.control('', [Validators.required]),
      tvaAmount: this.formBuilder.control(19.25 ),
      droit_daccises: this.formBuilder.control(''),
      montant_ttc: this.formBuilder.control(''),
      discount: this.formBuilder.control(0, [Validators.required]),
      small_note: this.formBuilder.control('', [Validators.required]),
      reduction_in: this.formBuilder.control('',[Validators.required]),
      tax_in: this.formBuilder.control('', [Validators.required]),
      sub_total: this.formBuilder.control(''),
      total: this.discount__amount,
      status: this.formBuilder.control(false),

      //items quantities here
      invoice_item: this.formBuilder.array([])



    });
    //this.summaryCalculation()

  }

  setEditInfo(id: any){

    this.billService.getInvoiceByBillsID(id).subscribe(billDEC =>{
      console.log(billDEC);

      this.editDetailsItems = billDEC
      console.log("ooo");



      for(let i = 0; i < this.editDetailsItems.length; i++){
        this.addProducts();
      }


    })



    this.billService.getOnebillById(id).subscribe(res=> {


      console.log(res);
      //this.collectionsData = this.invoiceDetails

      let edidData:any
      edidData=res;
      if(edidData!=null){
        this.toastr.success("Information retrieved successfully","INFO")
        this.invoiceForm.setValue({
          customer_id:edidData.invoice.customer_id,
          dateLimit:edidData.invoice.dateLimit,
          customerName:edidData.invoice.customerName,
          //billNumber:edidData.invoice.billNumber,
          billNumber:edidData.invoice.billNumber,
          compantName:this.companyName,
          serviceAddress:edidData.invoice.serviceAddress,
          postalAddress:edidData.invoice.postalAddress,
          phoneNumber:edidData.invoice.phoneNumber,
          customerEmailAddress:edidData.invoice.customerEmailAddress,
          websiteLink:edidData.invoice.websiteLink,
          type:edidData.invoice.type,
          currency:edidData.invoice.currency,
          tvaAmount:edidData.invoice.tvaAmount,
          discount:edidData.invoice.discount,
          montant_ttc:this.TTC_AMOUNT_CALC = edidData.invoice.montant_ttc,
          droit_daccises: this.droit_daccises = edidData.invoice.droit_daccises,
          reduction_in: this.discount__amount = edidData.invoice.reduction_in,
          tax_in:this.final_tax_amount = edidData.invoice.tax_in,
          small_note:edidData.invoice.small_note,
          sub_total:this.total__f=  edidData.invoice.sub_total,
          total:this.total__net = edidData.invoice.total,
          invoice_item: this.editDetailsItems,
          status: this.clientStatus


        })

        this.onCheckType()


      }
    })
  }


  /**
   *@DES -> GET PRODUCTS FROM PRODUCT TABLE */
  getProduct(): void{

    this.productService.getProducts().subscribe(products => {
      this.productData = products
      console.log(this.productData);

    });

  }
  getService(): void{
    this.serviceBloosat.__getAllService().subscribe(blooService =>{
      this.serviceData = blooService;
    })
  }
    /**
   *@DES -> GET CUSTOMERS FROM CUSTOMER TABLE */
  getCustomer(): void{
    this.customerService.getCustomers().subscribe(customer =>{
      this.customerData = customer
      this.customerData.customerID = this.customerData.at(0).id
      console.log("IDDDDD",this.customerData.customerID);

  });
  }







  addProducts(){

    this.invoiceDetails = this.invoiceForm.get("invoice_item") as FormArray;
    //this.invoiceDetails.push(this.GenerateRows());
    let customerId = this.invoiceForm.get('customer_id')?.value
    let type = this.invoiceForm.get('type')?.value

    if((customerId != null && customerId != '' && type != null && type != '') || this.isedit){
      this.invoiceDetails.push(this.GenerateRows());
      this.toastr.info('New product created')
    }else{
      this.toastr.warning('Please You need to select a customer First && a type to proceed','Validation')
    }
  }
  onRemoveProduct(i:any){

    Swal.fire({
      title: `Are you sure to remove product-${i+1}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ivProduct.removeAt(i);
        this.toastr.info(`Product ${i+1} removed`,"INFO");
        this.summaryCalculation()

        Swal.fire(
          'Deleted!',
          `Product ${i+1} removed`,
          'success'
        )
      }
    })





  }


  get ivProduct(){
    return this.invoiceForm.get("invoice_item") as FormArray;
  }
  GenerateRows(){

    return this.formBuilder.group({
      //service_id: this.formBuilder.control(''),
      product_id: this.formBuilder.control('', [Validators.required]),
      product_name: this.formBuilder.control('',[Validators.required]),
      quantity: this.formBuilder.control(1, [Validators.required]),
      unit_price: this.formBuilder.control(0, [Validators.required]),
      total: this.formBuilder.control(0, [Validators.required])
    })

  }









  saveInvoice(){
   this.collectionsData = this.invoiceDetails

   // creating object
    const invoiceData = {

      customer_id: this.invoiceForm.value.customer_id,
      dateLimit: this.invoiceForm.value.dateLimit,
      customerName: this.invoiceForm.value.customerName,
      //billNumber: this.invoiceForm.value.billNumber,
      billNumber: `FAC${this.uniqueIDFAC}-${this.customerData.customerID}` ,
      compantName: this.companyName,
      serviceAddress: this.invoiceForm.value.serviceAddress,
      postalAddress: this.invoiceForm.value.postalAddress,
      phoneNumber: this.invoiceForm.value.phoneNumber,
      customerEmailAddress: this.invoiceForm.value.customerEmailAddress,
      websiteLink: this.invoiceForm.value.websiteLink,
      type: this.invoiceForm.value.type,
      currency: this.invoiceForm.value.currency,
      // tvaAmount: this.final_tax_amount,
      // discount: this.discount__amount,
      droit_daccises: this.droit_daccises,
      montant_ttc: this.TTC_AMOUNT_CALC,
      tvaAmount: this.invoiceForm.value.tvaAmount,
      discount: this.invoiceForm.value.discount,
      small_note: this.invoiceForm.value.small_note,
      sub_total: this.total__f,
      total: this.total__net,
      reduction_in:this.discount__amount ,
      tax_in: this.final_tax_amount,
      invoice_item: this.collectionsData.value,
      status: this.clientStatus
    }

    // updating object
    const editeCustomer = {

      customer_id: this.invoiceForm.value.customer_id,
      dateLimit: this.invoiceForm.value.dateLimit,
      customerName: this.invoiceForm.value.customerName,
      //billNumber: this.invoiceForm.value.billNumber,
      billNumber: this.invoiceForm.value.billNumber ,
      compantName: this.companyName,
      serviceAddress: this.invoiceForm.value.serviceAddress,
      postalAddress: this.invoiceForm.value.postalAddress,
      phoneNumber: this.invoiceForm.value.phoneNumber,
      customerEmailAddress: this.invoiceForm.value.customerEmailAddress,
      websiteLink: this.invoiceForm.value.websiteLink,
      type: this.invoiceForm.value.type,
      currency: this.invoiceForm.value.currency,
      // tvaAmount: this.final_tax_amount,
      // discount: this.discount__amount,
      droit_daccises: this.droit_daccises,
      montant_ttc: this.TTC_AMOUNT_CALC,
      tvaAmount: this.invoiceForm.value.tvaAmount,
      discount: this.invoiceForm.value.discount,
      small_note: this.invoiceForm.value.small_note,
      sub_total: this.total__f,
      total: this.total__net,
      reduction_in:this.discount__amount ,
      tax_in: this.final_tax_amount,
      invoice_item: this.collectionsData.value,
      status: this.clientStatus
    }



   if(this.isedit){
    //console.log(this.editInvoiceMode);

    this._____updateInvoice(editeCustomer)


   }else{

    console.log(invoiceData);


    this.billService.createBillInvoiceService(invoiceData).subscribe(invoiceBill =>{
      //this.toastr.success("NEW INVOICE RECORDED SUCCESSFULLY","SUCCESS-BLOOSAT")
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(invoiceBill);
      /**
       *@Description RESETING OURFORM DATA
       TO INITILAS  */
      this.invoiceForm.reset();
      this.invoiceForm.reset();
      this.total__f = 0;
      this.discount__amount = 0;
      this.final_tax_amount = 0;
      this.total__net = 0;


      this.router.navigate(['/bills']);


    },(error: any)=>{
      this.toastr.error("The given data is invalid");
      console.log("There is an error with our server");
      console.log("TEST --->>>>",error)





    });



   }




    this.summaryCalculation()


  }



  //customer change
  customerChange(){

    let customerId = this.invoiceForm.get('customer_id')?.value
    console.log(customerId);

    this.customerService.getCustomerId(customerId).subscribe(cusId => {
      let custID: any;
       custID = cusId;
       if(custID!= null){
        this.invoiceForm.get('customerEmailAddress')?.setValue(custID.email)
        this.invoiceForm.get('phoneNumber')?.setValue(custID.telephone1);
        this.invoiceForm.get('customerName')?.setValue(custID.username);
        console.log(custID.telephone1);


      }

    })
  }

  onCheckType(){
    let type_invoice = this.invoiceForm.get('type')?.value
    this.type = type_invoice

  }

  changeItems(index: any){
    console.log(index);

    this.invoiceDetails = this.invoiceForm.get("invoice_item") as FormArray;
    this.itemsForm = this.invoiceDetails.at(index) as FormGroup;


    let productId = this.itemsForm.get('product_id')?.value
    console.log(productId);

    let serviceId = this.itemsForm.get('product_id')?.value

    this.globalServiceId = serviceId;





    if(this.type === "Redevance"){

      this.serviceBloosat.__onGetServiceById(this.globalServiceId).subscribe(data=>{
        let serviceID: any
        serviceID = data
        if(serviceID != null){
          this.itemsForm.get('unit_price')?.setValue(serviceID.amount);
          this.itemsForm.get('product_name')?.setValue(serviceID.serviceName);

          this.itemCalculation(index);

        }
      })
    }else{

      this.productService.getProductById(productId).subscribe(prodId => {
        this.product_and_service = "Product && Service"
        let prodID: any;
         prodID = prodId;
         if(prodID!= null){

          this.itemsForm.get('unit_price')?.setValue(prodID.amount);
          this.itemsForm.get('product_name')?.setValue(prodID.capacity)
          //console.log(prodID.amount);
          this.itemCalculation(index);


         }

      })



    }

  }


  itemCalculation(index:any){

    this.invoiceDetails = this.invoiceForm.get("invoice_item") as FormArray;
    this.itemsForm = this.invoiceDetails.at(index) as FormGroup;

    let qty = this.itemsForm.get('quantity')?.value
    let price = this.itemsForm.get('unit_price')?.value

    let total = qty * price
    this.itemsForm.get('total')?.setValue(total);

    this.summaryCalculation()
  }

summaryCalculation(){


    let array = this.invoiceForm.getRawValue().invoice_item;
    let sumtotal: any = 0;
    array.forEach((x:any)=>{
      sumtotal=sumtotal+x.total;
    })
    let discountAmt: any = this.invoiceForm.get('discount')?.value;
    let taxNumber: any = this.invoiceForm.get('tvaAmount')?.value;


        // Air 2% reduction from total amount - AMT
        let two_amt__air = (2 / 100) * sumtotal;
        this.droit_daccises = taxNumber?two_amt__air:0;

        let total__sou = this.droit_daccises + sumtotal
        this.total_sou =total__sou

        let sumTax = (taxNumber/100) * this.total_sou;/* SUM WITH TAX */

        this.final_tax_amount =Math.round(sumTax);

        this.total__f =sumtotal

        let reduction = (discountAmt /100) * this.TTC_AMOUNT_CALC
        let final_discount_amount = sumtotal - reduction ;

        this.discount__amount = Math.floor(reduction)

            //calculating netTotal
    let netTotal = this.total__f + this.droit_daccises - reduction
    //let final_reduction = netTotal - reduction
    this.total__net = netTotal;


















    console.log(this.total_sou);


    //let calculate montant__TTC
    let TTC_amount = this.final_tax_amount + this.total_sou
    this.TTC_AMOUNT_CALC = TTC_amount;




  }


  _____updateInvoice(invoiceData: any){
    this.billService.updateBilling(invoiceData,this.editInvoiceMode).subscribe(data =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been updated successfully',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(['/bills']);
    })
  }




  __onDisplatLastData(){
    this.billService.getAllBills().subscribe((dataBill: any) =>{
      this.receiptRecentData = dataBill?.data;
    })
  }



  onPrintInvoice(id: any){

    this.router.navigateByUrl('/receipt/'+id)
    console.log(id)
  }
  onDeleteInvoice(id:any){
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       // console.log(id);
        this.invoiceService.deleteInvoice(id).subscribe(()=>{
          this.toastr.info('Invoice deleted successfully',"MSG")
        })
        this.__onDisplatLastData();


      }
    },(error)=>{
      console.log(error);

    })
    //Swal.fire("Hello world!!");
    this.__onDisplatLastData();

  }


}
