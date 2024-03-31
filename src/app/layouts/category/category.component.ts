import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  isSpinning: boolean = false;
  globalCategoryId: any;
  isEditeMode: any = false;
   totalLength: any;
  page:number =1

  categoryData: any[] = []


  constructor(
    private formBuilder: FormBuilder,
    private toastre: ToastrService,
    private router: Router,
    private localalStorage: LocalStorageService,
    private route: ActivatedRoute,
    private categoryService:CategoryServiceService
  ){

    this.___onGetCategory()


  }


  ngOnInit(): void {

    this.___initCategoryForm()

  }



  ___initCategoryForm(){

    this.categoryForm = this.formBuilder.group({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(7)]),
      categoryDescription: new FormControl('', [Validators.required, Validators.minLength(20)])

    })

  }

  get categoryName(){
    return this.categoryForm.get('categoryName');
  }

  get categoryDescription(){
    return this.categoryForm.get('categoryDescription');
  }



  onSubmitCategoryForm(){
    this.isSpinning = true
    const category: Category = {
      categoryName: this.categoryForm.value.categoryName,
      categoryDescription: this.categoryForm?.value.categoryDescription,

    }

    if(this.isEditeMode === true){
      // if our editMode variables is true we update 
      this.onUpdateCategoryForm(category)
    }else{
      //else we insert (ADDINGB TO OUR DATABASE)

      this.categoryService.createNewCategory(category).subscribe((cat) => {
        console.log(cat)
        if(cat){
         
          this.toastre.success("New Category created successfully!!!")
          this.___onGetCategory();
          this.categoryForm.reset();
          this.isSpinning = false
        }
      }, (error) => {
        if(error){
  
          const username = this.localalStorage.getUserName()
          this.toastre.error(`Sorry ${username}, there was an internal server problem try again latter`)
        }
        console.log(error)
      })
  
      console.log(category)

    }

  
  }


  ___onGetCategory(){

    this.categoryService.getCategories().subscribe(customers => {
      console.log("======");
      
      console.log(customers)
      this.categoryData = customers
      this.toastre.success("BSS data retrived successfully!!")

      console.log("======");
    })
  }


  onEditCat(categoryId: any){
    
    this.isEditeMode = true
    this.globalCategoryId = categoryId
    this.categoryService.getCategoryById(categoryId).subscribe(cateData => {
      let catDataValue: any = cateData
      console.log(catDataValue);
      
      if(catDataValue != null){
        this.categoryForm.setValue({
          categoryName: catDataValue.categoryName,
          categoryDescription: catDataValue.categoryDescription

        })
      }
      

      
    }, (error) => {

    })

  }

  onDeleteCategory(categoryId: any){
    
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
        
        this.categoryService.__onDeleteCategory(categoryId).subscribe(result => {
          this.___onGetCategory();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        },(error) =>{
          Swal.fire(
            'Deleted!',
            `Your file has been deleted. ${error}`,
            'error'
          )
        })



        
      }
    })
    
  }

  onUpdateCategoryForm(categoryData: any){
    this.categoryService._onUpdateCategories(this.globalCategoryId, categoryData).subscribe((updatedData) => {

      Swal.fire({
        title: `Product Id-${this.globalCategoryId}`,
        text: "updated Successfully!!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'close!'
      })
      //ending the spinner in instance from the app data
      // bt setting to false after ending task execution from method 
      //call ---> SOH TAGNE ACHILLE IVES
      this.___onGetCategory();
      this.isSpinning = false;
    }, (error) => {
      this.toastre.error(' Sorry, but there was an error!!' + error)
      this.toastre.error(`INTERNAL ERROR ${error}`, " SERVER ERROR")
    })
  }
  onChange(){
    this.isEditeMode = false;
  }
}
