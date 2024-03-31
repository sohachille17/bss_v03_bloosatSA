import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ServiceModel } from 'src/app/models/service.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlooServiceService } from 'src/app/services/bloo-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bloo-service',
  templateUrl: './bloo-service.component.html',
  styleUrls: ['./bloo-service.component.css']
})
export class BlooServiceComponent  implements OnInit{

  serviceForm!: FormGroup<any>;
  globalServiceId: any;
  isSpinner: any = false;
  localUserName: any;
  serviceData: any[] = [];
  searchTextL: any = ''
  editMode: any = false;
  oneServiceData: any;
  serviceDetailsUnique: any;
  totalLength: any;
  page:number =1;
  userRole: any;


  constructor(

    private tosatr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private blooService: BlooServiceService,
    private localService: LocalStorageService,


  ){

  }
  ngOnInit(): void {
    this.userRole =  this.localService.getRole()
   this.___onBlooSatInit();
   //load service data from server
   this.__onGetBloosatService();


  }
  __onGetBloosatService(){
    this.blooService.__getAllService().subscribe((bloosatServices) => {
      this.tosatr.success('Service Data Loaded Successfully', "BSS-SUCCESS");
      this.serviceData = bloosatServices;
      console.log(this.serviceData);
    }, (error)=> {
      this.tosatr.error("Internal Server Error", 'BSS-ERROR');
      console.log(error);
    })
  }


  ___onBlooSatInit(){

    this.serviceForm = this.formBuilder.group({

      serviceName: this.formBuilder.control('', [Validators.required]),
      serviceCapacity: this.formBuilder.control('', [Validators.required]),
      amount: this.formBuilder.control('', [Validators.required]),
      code: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      registeredBy: this.formBuilder.control({value: '',disabled: true})



    })




  }

  //Preperd to get validation data here
  get serviceName(){
    return this.serviceForm.get('serviceName')
  }
  get serviceCapacity(){
    return this.serviceForm.get('serviceCapacity')
  }
  get amount(){
    return this.serviceForm.get('amount')
  }

  get code(){
    return this.serviceForm.get('code');
  }

  get description(){

    return this.serviceForm.get('description')
  }






  // onSubmit service --> create
  onSubmitService(){

    this.isSpinner = true;

    this.localUserName = this.localService.getUserName()
    const serviceData: ServiceModel = {

      serviceName: this.serviceForm.value.serviceName,
      serviceCapacity: this.serviceForm.value.serviceCapacity,
      amount: this.serviceForm.value.amount,
      code: this.serviceForm.value.code,
      description: this.serviceForm.value.description,
      registeredBy: this.localUserName,
      type:'service'


    }


    if(this.editMode === true){

      this.__onUpdateMode(serviceData);
    }else{

      this.blooService.createNewService(serviceData).subscribe(serviceD => {
        this.tosatr.success("New Service Created Successfully","BSS-SUCCESS")
        this.isSpinner = false;
        this.serviceForm.reset();
        this.__onGetBloosatService();
      },(error)=>{
        this.tosatr.error("Internal Server Error",'BSS-ERROR')
        console.log(error);

      })

    }





  }
  onEditBloosatService(serviceID: any){
    //prepare for edit  -> BLOO EDIT
    this.editMode = true;
    this.globalServiceId = serviceID;
    this.blooService.__onGetServiceById(serviceID).subscribe((uniqueService)=>{
      let services: any = uniqueService
      if(services != null){
        this.serviceForm.patchValue({
          serviceName: services.serviceName,
          serviceCapacity: services.serviceCapacity,
          amount: services.amount,
          code: services.code,
          description: services.description,
          registeredBy: services.registeredBy,
        });
      }

    })
  }

  onSetDefaultValue(){
    this.serviceForm.patchValue({
      code: "0000"
    })
  }

  onDeleteService(servideId: any){


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
        //
        this.blooService.__onDeleteService(servideId).subscribe(result =>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.__onGetBloosatService();

        },(error) =>{
          this.tosatr.warning('Internal Server Error', "BSS-WARNING");
          console.log(error);
        });


        //

      }
    })


  }

  __onUpdateMode(serviceData: any){

    this.blooService.__onUpdateServiceByID(this.globalServiceId, serviceData).subscribe((newData) =>{

      this.tosatr.success("Service Updated Successfully","BSS-SUCCESS");
      this.__onGetBloosatService();
      this.isSpinner = false
    }, (error)=>{
      this.tosatr.error("Internam Server Error","BSS-ERROR");
      console.log(error);
    })
  }


  onInit(){
    this.editMode = false
    this.serviceForm.reset();
    this.onSetDefaultValue();
  }




  onViewDetailService(serviceID: any){
    this.blooService.__onGetServiceById(serviceID).subscribe((detailsID)=>{
      this.serviceDetailsUnique = detailsID;
      console.log(this.serviceDetailsUnique);

    }, (error)=>{
      console.log(error);

    })
  }

    //default name for excel file

    fileName = "service.xlsx";
    onExportToExcel(){
      let data = document.getElementById("table-data");
      const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

      /***Generate workbook and add the
       ***/
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')

      // save to file
      XLSX.writeFile(wb, this.fileName);

    }








}
