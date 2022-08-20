export interface ICategory {
    id?:number;
    name:string;
    name_Ar:string;
    description:string;
    description_Ar:string;
}

export interface ICategoryResponse{
        succcess?: boolean;
        message?: string;
        data?: any;
}
