import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/helpers/interfaces/icategory';
import { IProduct, IShowProduct } from 'src/helpers/interfaces/iproduct';
import { CategoryService } from 'src/helpers/services/category.service';
import { ProductService } from 'src/helpers/services/product.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {

  productList:any[]=[];
  categoryId:number;
  categoryName:string="";
  categoriesList:ICategory[]=[];
  constructor(private categoryService:CategoryService,private productService:ProductService) {
    this.categoryId = -1;
   }
  
  ngOnInit(): void {
    this.getAllCategories();
  }
  serverErrorMessage:string="";
  getAllCategories(){
    this.categoryService.getAll().subscribe(
      (data)=>{
        console.log("Data"+data);
        this.categoriesList = <ICategory[]> data;
      },
      (error)=>{
        this.serverErrorMessage ="Errors In Retrieving Data !"+error;
      }
    )
  }
  
  getproductsByCategoryId(){
    this.productList=[];
    this.productService.getProductsByCategoryId(this.categoryId).subscribe(
      data=>{
        console.log("----------data---------------");
        console.log(data);
        this.productList = data.data as any[];
        console.log("----------cat List---------------");
        console.log(this.productList);
      }
    );
    
  }
 

}
