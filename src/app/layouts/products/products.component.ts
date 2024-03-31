import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/products.model';
import { BlooServiceService } from 'src/app/services/bloo-service.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  productData: any[] = [];
  productForm!: FormGroup;
  category: any[] = [];
  isLoading: boolean = false;
  searchTextL: any = '';
  onEditMode:any = false;
  globalProductID: any;
  totalLength: any;
  page:number =1
  userRole: any;

  constructor(
    private formBulder: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductServiceService,
    private router: Router,
    private localStorageService: LocalStorageService,

    private route: ActivatedRoute,
    private categoryService: CategoryServiceService

  ){


    this.categoryService.getCategories().subscribe(newCat => {

      this.category = newCat;
      console.log(this.category)
    })
    this.___initProductForm()


  }
  ngOnInit(): void {
   this.__onGetAllProduct();
   this.userRole =  this.localStorageService.getRole()
  }

  ___initProductForm(){

    this.productForm = this.formBulder.group({

      capacity: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category_name: new FormControl('', [Validators.required])
    })


  }

  __onGetAllProduct(){
    this.productService.getProducts().subscribe(product => {
    //console.log(product);
    this.productData = product
    //console.log(this.productData)

    })
  }




  get capacity(){
    return this.productForm.get('capacity')
  }
  get amount(){
    return this.productForm.get('amount')
  }
  get code(){
    return this.productForm.get('code')

  }
  get description(){
    return this.productForm.get('description')

  }
  get category_name(){
    return this.productForm.get('category_id')
  }





  onSubmitProductForm(){
    this.isLoading = true;

    const product: Products = {
      capacity: this.productForm.value.capacity,// product name to be
      amount: this.productForm.value.amount,
      code: this. productForm.value.code,
      description: this.productForm.value.description,
      category_name: this.productForm.value.category_name,
      type: 'product'

    }

    if(this.onEditMode == true){
      console.log("UPDATED")

      this.___onUpdateProductData(product);
      this.toastr.info('Updated', "UPDATE")


    }else{



      this.productService.createProduct(product).subscribe(prod => {

        this.isLoading = false
        this.toastr.success("Product created successfully!!")
        this.productForm.reset()
        this.__onGetAllProduct()
      }, (error) => {

        this.toastr.error("Sorry we have an internal server error!!")
        console.log(error);
      })


      console.log(product)
    }




  }

  onDeleteProducts(productID: any){

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

        this.productService.onDELETEPRODUCTS(productID).subscribe(()=>{
         // this.toastr.success("DELETED")
          this.__onGetAllProduct()
        }, (error)=>{
          console.log(error);

        })

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })










  }

  onEditProduct(productId: any){
    this.onEditMode = true;
    this.globalProductID = productId
    this.productService.getProductById(productId).subscribe(prods =>{
      let productDs = prods
      if(productDs != null){

        this.productForm.setValue({
          capacity: productDs.capacity,
          amount: productDs.amount,
          code: productDs.code,
          description: productDs.description,
          category_name: productDs.category_name
        })

      }
    })

  }

  ___onUpdateProductData(productData: any){

    Swal.fire({
      title: `Product Id-${this.globalProductID}`,
      text: "updated Successfully!!",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'close!'
    })
    this.productService._updateProducts(this.globalProductID, productData).subscribe(updatedProd =>{
      console.log(updatedProd);
      this.productForm.reset();

    },(error) =>{
      console.log(error);

    })

    this.__onGetAllProduct();

  }



  state(){
    this.onEditMode = false;
    this.productForm.reset()
  }




}
