import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LoginServiceService } from 'src/Services/login-service.service';

import { SharedService } from 'src/helpers/services/shared.service';
import { CartItemsService } from 'src/helpers/services/cart-items.service';
import { IShowCartItemProduct } from 'src/helpers/interfaces/iproduct';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,AfterViewInit {
  username:string=" ";
  lang:any; 
  textDirection:string;
  IsAdmin:boolean=false;
  IsPartner:boolean=false;
  IsLoggedIn:boolean=true;
  cartItemsCount:any;
  constructor(private cartService:CartItemsService,private translateservice:TranslateService,private router:Router,private sharedService:SharedService,private loginService:LoginServiceService) 
   {
    this.translateservice.setDefaultLang("en");
    this.translateservice.use(localStorage.getItem('lang')||'en');
    this.textDirection = this.sharedService.textDirection
     this.loginService.getMe().subscribe((name) => {
        this.username=name.userName;
        localStorage.setItem('Roles',name.roles);
        console.log(name.roles);
        console.log(name.roles.includes('Admin'));
        this.IsAdmin=name.roles.includes('Admin');
        this.IsPartner=name.roles.includes('Partener');
        console.log(this.IsPartner);
   });
   this.IsLoggedIn=localStorage.getItem('token')==null;
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang")||"en";
    this.cartItemsCount = localStorage.getItem("cart");
  }
  ngAfterViewInit(): void {
    
  }
  goSearchProduct(){
    this.router.navigate(['/home/productsByProductName'])
  }
  // getCartItemsCount(){
  //   let cartList=[];
  //  this.cartService.getAllCartItems().subscribe(
  //   data=>{
  //     cartList = data.message;
  //     this.cartItemsCount  = cartList.length;
  //   }
  //  )
  // }
  changeSelectedLanguage(event:any){
    localStorage.setItem("lang",event);
    window.location.reload();
  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('Roles');
    localStorage.removeItem('expiration');
    this.router.navigate(['LoginUser']);//Edit By Ataa
    location.reload();
    
    
    //.then(()=>{
      //window.location.reload();

     //})
 
   
  }


}
