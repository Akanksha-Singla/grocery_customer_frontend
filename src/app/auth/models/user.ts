export interface IUser {
    _id?:string
    user_image:string;
    username: string;
    password: string;
    email: string;
    contact_number: string;
    address: string;
    role_id: string;
    role:string;
    role_specific_details?:any;
    status?:string;
    refreshToken?:string
    
   
    }
  export interface IUserResponse{
    message:string;
    statusCode:string;
    success:string
    data:IUser;
  
  }