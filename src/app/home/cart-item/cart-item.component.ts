import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IShowCartItemProduct, IShowProduct } from 'src/helpers/interfaces/iproduct';
import { CartItemsService } from 'src/helpers/services/cart-items.service';
import { SharedService } from 'src/helpers/services/shared.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  cartItemsList:IShowCartItemProduct[]=[];
  cartCount:any;
  constructor(private cartService:CartItemsService,private location:Location,private cartItemService:CartItemsService,private shared:SharedService) {
   }

  ngOnInit(): void {
    this.getAllCartItems();
    this.cartCount = localStorage.getItem("cart");
  }
 
  getAllCartItems(){
    this.cartItemService.getAllCartItems().subscribe(
      data=>{
        this.cartItemsList=data.message as IShowCartItemProduct[];
        localStorage.setItem("cart",this.cartItemsList.length>0?this.cartItemsList.length.toString():"0");
        console.log(data);
      }
    );
  }
  getTotal(){
    let total = 0;
    let discount=1;
    for (let i = 0; i < this.cartItemsList.length; i++) {
      discount = this.cartItemsList[i].price - (this.cartItemsList[i].price*this.cartItemsList[i].descount_Persent);
      total+=discount*this.cartItemsList[i].quantityOrdered;
    }
    return total;
  }
  deleteItemFromCart(id:number){
    this.cartItemService.deleteFromCart(id).subscribe(
      data=>{
        this.shared.showSnackBar("Item Deleted Succesfully",3000,"warningSnackBar");
        this.getAllCartItems();
      }
    );
    this.shared.getCartItemsCount();
  }
  back(){
    this.location.back();
  }
}
