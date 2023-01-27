import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category = {
    title: '',
    description:'',
  }

  constructor(private categoryService: CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title.trim() == '' || this.category.title == null){
      this._snack.open("Title required !!", '',{
        duration:3000,
      })
      return;
    }

    // all done
    this.categoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title = '';
        this.category.description = '';
        Swal.fire("Success !!", 'Category is added successfuly', 'success');
      },
      (error) =>{
        console.log(error);
        Swal.fire("Error !!", 'Server error !!', 'error');
      } 
    );

  }



  

}
