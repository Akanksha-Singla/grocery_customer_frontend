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
