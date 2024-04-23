import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { UserContract } from '../../contracts/UserContract';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IshopapiService } from '../../service/ishopapi.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public title : string ="";
  public users : UserContract[] = [];
  public userId !: number ;
  public user : any = {};
  public categories : any = [];
  public products : any = [];
  public stock : boolean = false;
  public stockFlag : boolean = false;
  public userFlag : boolean = true;
  public categoryFlag : boolean = false;
  public product : any = {};
  form!: FormGroup;
  update!: FormGroup;
  stockDetail!: FormGroup;
  addProducts!: FormGroup;
  
  constructor(private accountService : AccountService,
              private formBuilder: FormBuilder,
              private ishopService : IshopapiService,
              private route : Router,
              private http : HttpClient
   ) { }

  ngOnInit(): void {
    this.getAllUser();

    this.update = this.formBuilder.group({
      userId: [this.user.userId,Validators.required],
      fullName: [this.user.fullName,Validators.required],
      email: [this.user.email,Validators.required],
      mobile: [this.user.mobile,Validators.required],
      gender: [this.user.gender,Validators.required],
      dob: [this.user.dob,Validators.required],
      role: [this.user.role,Validators.required],
      address: [this.user.address,Validators.required]
     })

     this.stockDetail = this.formBuilder.group({
      category: [this.product.category,Validators.required],
      pid: [this.product.pid,Validators.required],
      productName: [this.product.productName,Validators.required],
      price: [this.product.productPrice,Validators.required],
      quantity: [this.product.quantity,Validators.required],
     })

     this.addProducts = this.formBuilder.group({
      productType: ['',Validators.required],
      productName: ['',Validators.required],
      productPrice: ['',Validators.required],
      quantity: ['',Validators.required],
      filePath: ['',Validators.required],
     })
  }

  public addProduct(){
    this.accountService.addProduct(this.addProducts.value).subscribe(
      data => {
        Swal.fire({
          text:"Product added successfully",
          icon:"success",
          confirmButtonText:"Ok"
         })

         this.route.navigate(['user']);
      },
      error =>{
        Swal.fire({
          text:"Something went wrong..",
          icon:"error",
          confirmButtonText:"Ok"
         })
      }
    )
  }

  public initProduct(product:any){
    this.product = product;
    console.log(this.product);
    this.ngOnInit();
  }

  public editStock(){
    console.log(this.stockDetail.value);
    this.accountService.updateProductById(this.product.pid,this.stockDetail.value).subscribe(data=>{
      console.log(data.msg);
      Swal.fire({
        text:data.msg,
        icon:"success",
        confirmButtonText:"Ok"
       })
      },
      error =>{
        Swal.fire({
          text:"Something went wrong",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    )
  }

  public getAllUser(){
    this.categoryFlag = false;
    this.stockFlag = false;
    this.userFlag = true;
    return this.accountService.getAllUser().subscribe(data =>{
      this.users = data;
      console.log(this.users);
     },
     error =>{
      Swal.fire({
        text:"Something Went wrong",
        icon:"error",
        confirmButtonText:"Ok"
      })
     }
    )
  }

  public loadProductByCategory(category:any){
    this.categoryFlag = true;
    this.userFlag = false;
    this.stockFlag = true;
    this.title = category+" Products";
    return this.http.get<any>(`http://localhost:8080/admin/fetch/${category}`).subscribe(
      data => {
        this.products = data;
      },
      error =>{
        Swal.fire({
          text:"Something went wrong",
          icon:"error",
          confirmButtonText:"OK"
        })
      }
    )
  }

  public loadCategory(){
    this.userFlag = false;
    this.stockFlag = false;
    this.categoryFlag = true;
    this.ishopService.loadCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  public stockDetails(){
    this.categoryFlag = false;
    this.userFlag = false;
    this.stockFlag = true;
    this.title = "All Products";
    this.ishopService.loadProducts().subscribe(data =>{
      this.products = data;
      console.log(this.products);
     },
     error =>{
      Swal.fire({
        text:"Something Went wrong..",
        icon:"error",
        confirmButtonText:"OK"
      })
     }
    )
  }

  public deleteUserById(id:number){
    console.log(id);
    this.accountService.delete(id).subscribe(data=>{
      Swal.fire({
        text:"User Deleted Successfully",
        icon:"success",
        confirmButtonText:"Ok"
      })
      this.getAllUser();
     },
     error => {
      Swal.fire({
        text:"Something Went wrong",
        icon:"error",
        confirmButtonText:"Ok"
      })
     }
    )
  }

  public upadteUser(user:any){
    this.userId = user.userId;
    this.user = user;
    this.ngOnInit(); 
  }

  public onUpdate(){
    return this.accountService.update(this.userId,this.update.value).subscribe(data =>{
      Swal.fire({
        text:data.msg,
        icon:"success",
        confirmButtonText:"OK"
      })
     },
     error =>{
      Swal.fire({
        text:"Something went wrong",
        icon:"error",
        confirmButtonText:"OK"
      })
     }
    )
  }

}
