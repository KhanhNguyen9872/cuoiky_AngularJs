import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList:Cart[]=[]
  constructor(private prod:ProductService) {
    // this.prod.getProduct().subscribe(data =>{
    //   this.cartList=data
    //   console.log(this.cartList);
      
    // })
  }
  getCartAll(){
    return this.cartList
  }
  getInStock(id:number){
    return this.cartList.find(i=>i.Id==id)?.inStock
  }
  addCart(index:number,frmProduct:any){
    let itemInCart = this.cartList.filter(i=>i.Id==index)
    let isItemInCart=itemInCart.length>0
    if(isItemInCart==false){
      let id= this.cartList.push({
        "Id":frmProduct.id,
        "Name":frmProduct.productName,
        "Des":frmProduct.description,
        "Price":frmProduct.price,
        "ImageUrl":frmProduct.imageUrl,
        "inStock":frmProduct.inStock,
        "Quantity":0
      }) - 1
      this.cartList[id].Quantity = this.cartList[id].Quantity! + 1
      this.cartList[id].inStock = this.cartList[id].inStock! - 1
      console.log(this.cartList);
    }
    else{
      for(let i =0; i<this.cartList.length;i++){
        if(this.cartList[i].Id==index){
          this.cartList[i].Quantity = this.cartList[i].Quantity! + 1
          this.cartList[i].inStock = this.cartList[i].inStock! - 1
        }
        // if(this.cartList[i].Id==this.prod.getproductId(index)?.productId){
        //   this.cartList[i].Quantity = this.cartList[i].Quantity! + 1
        //   this.cartList[i].inStock = this.cartList[i].inStock! - 1
        // }
      }
    }
  }
  // sum tổng
    totalItems(){
      let sum=0;
      this.cartList.forEach(item=>{
        sum+=item.Quantity!;
      });
      return sum;
    }
    Total(){
      let total=0;
      this.cartList.forEach(item=>{
        total+=(item.Price! * item?.Quantity!);
      });
      return total;
    }
    RemoveCart(index:number){
      this.cartList[index].inStock! +=1
      this.cartList[index].Quantity! -=1

      if(this.cartList[index].Quantity == 0){
        this.cartList.splice(index,1);
        this.cartList[index].Quantity! +=1
        
        
      }
      // this.cartList[index].inStock! +=1
    }
    DeleteAllCart(){
      for(let i=0; i<this.cartList.length;i++){
        this.cartList.splice(i,this.cartList.length);
       
      }
      
      
    }
}
