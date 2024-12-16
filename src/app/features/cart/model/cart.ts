export interface ICartItem {
    product_id:string;
    quantity_purchased: number;
    quantity: number;
    price: number;
    product_name: string;
    product_image?: string;
  }

  export interface IAddCartResponse{
    statusCode: number;
    success: boolean;
    message: string;
    data:{
      user_id:string,
      items:ICartItem[],
      total_amount:number,
      _id:string
    };
  }

  export interface IAdress{
    label: string; 
    street: string; 
    city: string;
    state: string; 
    postalCode: string;
   isDefault?: boolean; 
  }
  export interface IAdressResponse{
    statusCode: number;
    success: boolean;
    message: string;
    data:any
  }