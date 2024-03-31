import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customers } from 'src/app/models/customers.model';
import { emailReg } from 'src/app/password';
import { ToastrService } from 'ngx-toastr';
import { STATUS_UTILES } from 'src/app/password';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { shareReplay, tap } from 'rxjs';
import { logos } from 'src/app/password';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customerForm!: FormGroup
  customersData: any[] = [];
  customer: any
  totalLength: any;
  page:number =1

  isActive: boolean = false
  isDeleted:boolean = false
  status!: number;
  globalCusid: any;

  buttonValueTrue: any = STATUS_UTILES.SUCCESS;
  buttonValueFalse: any = STATUS_UTILES.DANGER
  buttonText: string = "inactive";
  isLooking: boolean = false;

  img = logos

  status_test: any = true
  try_true: any
  post_status: boolean = false
  singleForm!: Customers

  // user role
  userRole: any;


  // Edite mode for customers form
  edidtMode: boolean = false;
  editButton!: string;
  customersFormTitle!: string;
  statusChange!: any;
  uniqueCusBill: any;
  defaultValue: any = "000000000"


  //search
  searchTextL: any = '';


  arrayOfType: any = [

    {
      id: 0,
      status: "active"
    },
    { id: 1,
      status:"inactive"
    }
  ]






  constructor(
    private formBulder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private routes: ActivatedRoute,
    private customersService: CustomersServiceService,
    private localstorageService : LocalStorageService
    ){

      this.__onGetData();
      // this.valueTest()




  }
  ngOnInit(): void {
    this.userRole = this.localstorageService.getRole()

    this.__initCustomersForm()
    this.onEdit();

  }




  __initCustomersForm(){

    this.customerForm = this.formBulder.group({

      username: new FormControl('', [Validators.required, Validators.minLength(10)]),
      userMaillAddrtess: new FormControl('', [Validators.required, Validators.pattern(emailReg)]),
      email_2: new FormControl('', [Validators.pattern(emailReg)]),
      country: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      telephoneNumber1: new FormControl({value: '00000000', disabled: false}, [Validators.required]),
      telephneNumber2: new FormControl({value: '00000000', disabled: false}, [Validators.required]),
      city_village: new FormControl('', [Validators.required]),
      residential_type: new FormControl('', [Validators.required]),
      new_status: new FormControl('', [Validators.required])
    });
  }

  get username(){
    return this.customerForm.get('username');
  }
  get email_2(){
    return this.customerForm.get('email_2');
  }
  get userMaillAddrtess(){
    return this.customerForm.get('userMaillAddrtess');
  }
  get country(){
    return this.customerForm.get('country');
  }
  get region(){
    return this.customerForm.get('userMaillAddrtess')
  }
  get telephoneNumber1(){
    return this.customerForm.get('telephoneNumber1')
  }
  get telephneNumber2(){
    return this.customerForm.get('telephneNumber2')
  }
  get city_village(){
    return this.customerForm.get('city_village')
  }
  get residential_type(){
    return this.customerForm.get('residential_type')
  }
  get new_status(){
    return this.customerForm.get('new_status');
  }


  onSubmitCustomers(){
    this.isLooking = true
    if(this.customerForm.value.new_status === 'active'){
      this.status = 1
    }else{
      this.status = 0
    }


    const customers: Customers ={

      //id: this.globalCusid,
      username: this.customerForm.value.username,
      type: this.customerForm.value.residential_type,
      name: this.customerForm.value.username,
      country: this.customerForm.value.country,
      city: this.customerForm.value.city_village,
      active: this.isActive,
      email: this.customerForm.value.userMaillAddrtess,
      email_2: this.customerForm.value.email_2,
      status: this.status,
      deleted: this.isDeleted,
      region: this.customerForm.value.region,
      telephone1: this.customerForm.value.telephoneNumber1,
      telephone2: this.customerForm.value.telephneNumber2,



    }


    if(this.edidtMode){
      console.log(customers)
      this.___updateAllCustomer(customers);
      this.__onGetData()

    }else{


      console.log(customers)

      this.customersService.createCustomer(customers).subscribe((custom)=>{
        if(custom){
          this.toastr.success("Customers details inserted successfully");
          this.customerForm.reset();
          this.__onGetData();
        }
      }, (error) =>{
        console.log(error);

        this.toastr.error("Internal server error faild to insert sorry!!!")
      });









    }


   //console.log(this.customerForm.value);



  }

  onGetData(){
    this.customerForm.patchValue({
      telephoneNumber1 :  "0000000000",
      telephneNumber2 :   "0000000000",
      new_status:this.arrayOfType[0].status
    })
  }


  // valueTest(){

  //   this.customersService.getCustomers().pipe(
  //     shareReplay()
  //   ).subscribe(value=>{

  //   this.customersData = value
  //   this.customersData.forEach(element => {
  //     //console.log(element.)
  //   });

  //   })

  // }

  __onGetData(){
    this.customersService.getCustomers().pipe(
      tap(() => console.log("DONE!!!!!!")),

      ).subscribe((data)=>{
      //console.log(data)
      this.customersData = data;
      //this.customersData.reverse();
      this.toastr.success("Valid (BSS DATA!!!)")

    },(error)=>{
      this.toastr.error("Internal Server Error (BSS ERROR!!)")
      console.log(error);
    })
  }



  onUpdateCustomers(customerId: any){

    this.router.navigateByUrl(`customers/${customerId}`)
    this.editButton = "Update Changes"
  }

  onEdit(){

    this.routes.params.subscribe(param => {
      if(param.id){
        this.edidtMode = true
        this.globalCusid = param.id
        this.customersService.getCustomerId(param.id).subscribe(custTomerVal => {
          this.singleForm = custTomerVal
          this.globalCusid = param.id

          if(custTomerVal.status === 1){
            this.statusChange = this.arrayOfType[0].status
          }else{
            this.statusChange = this.arrayOfType[1].status
          }

          //this.singleForm = custTomerVal
          this.customerForm.patchValue({
            username: custTomerVal.username,
            userMaillAddrtess: custTomerVal.email,
            country: custTomerVal.country,
            region: custTomerVal.region,
            telephoneNumber1: custTomerVal.telephone1,
            telephneNumber2: custTomerVal.telephone2,
            city_village: custTomerVal.city,
            residential_type: custTomerVal.type,
            email_2: custTomerVal.email_2,
            new_status: this.statusChange
          })




         // console.log(custTomerVal.status);



        })
      }
    })
  }
  onChange(){
    this.edidtMode = false
    this.customerForm.reset()
    this.editButton = "Save Changes"


    this.onGetData()
  }


  private ___updateAllCustomer(customerData: any){

    this.customersService.updateCustom(customerData, this.globalCusid).subscribe(value =>{
      this.toastr.success("BSS INFO DATA UPDATED SUCCESSFULLY")
      console.log(value);
      this.isLooking= false

    },(error)=>{
      this.toastr.error("BSS FOUND AN ERROR SORRY!!!")
      console.log(error);
      this.isLooking = false

    })
  }

  // onBillSelect(cusuId: any){
  //   this.router.navigateByUrl('/souscription-KAF/'+cusuId)

  // }
  onBillSelect(cusuId: any){
    this.router.navigateByUrl(`/souscription-KAF?id=${cusuId}`)

  }

  // onPaymentMove(customerId: any){
  //   this.router.navigateByUrl('/customer-payment/'+customerId)
  // }
  onPaymentMove(customerId: any){
    this.router.navigateByUrl(`/customer-payment?id=${customerId}`)
  }

  onNavigate(customerId: any){

    this.router.navigateByUrl(`/customer-unique-bill?id=${customerId}`)

  }
  onIwaySubscription(customerId: any){
    this.router.navigateByUrl(`/i-way-soubscription?id=${customerId}`)
  }

  onBlooStar(customerId: any){
    this.router.navigateByUrl(`/bloo-star?id=${customerId}`)
  }



      //default name for excel file

      fileName = "clients.xlsx";
      createXLSX(){

        let data = document.getElementById("table-data");
        const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

        /***Generate workbook and add the
         ***/
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')

        // save to file
        XLSX.writeFile(wb, this.fileName);

      }
      onExportToExcel(){

        Swal.fire({
          title: "CREATE XLSX FILE",
          text: "",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            this.createXLSX()

          }
        });
      }







}
