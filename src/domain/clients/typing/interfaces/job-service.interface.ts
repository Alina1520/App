export interface IJobService{
    chooseCategory(id:number,data:string):Promise<void>
    getLocation(userId:number):Promise<ILocation>
    preferStudio(userId:number,data:boolean):Promise<boolean>
    dateAndTime(userId:number,data:IDateAndTime):Promise<void>
    setPrice(userId:number,data:IRate):Promise<void>
    numberOfMembers(userId:number,count:number):Promise<void>
    reqPickup(userId:number,data:boolean):Promise<void>
    titleAndDesc(userId:number,data:IHeaderDescription):Promise<void>
}

export interface ILocation{
    city:string;
    country:string;
}
export interface IDateAndTime{
    time:string;
    duration:number;
    data:Date;
    asap:boolean
}
export interface IRate{
    currency:string;
    amount:number;
    typePrice:string
}
export interface IHeaderDescription{
    headline:string;
    description:string;
    file:string;
}