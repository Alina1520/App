import { User } from "src/domain/users"
import { Course, Lesson } from "../../entities"
import { BoughtCourse } from "../../entities/bought-course.entity"

export interface ICourseService{
    createCourse(data:IPayloadCourse):Promise<number>
    editCourse(changedData:IPayloadCourse,courseId:number):Promise<void>
    createLesson(data:IPayloadLesson,courseId:number):Promise<void>
    editLesson(changedData:IPayloadLesson,lessonId:number):Promise<void>
    deleteCourse(id:number):Promise<void>
    saveCompletedLesson(lessonId:number,userId:number):Promise<void>
    saveBoughtCourse(courseId:number,userId:number):Promise<void>
}

export interface ICourse{
    id:number
    userId:number
    lesson:Lesson[]
    user:User
    buyers:BoughtCourse[]
    title:string
    description:string
    amount:number
    reviews:number
    currency:string
    duration:string
    rating:number
    sales:number
    earned:number
    active:boolean
    createdAt:Date
    updatedAt:Date
}

export interface ILesson{
    id:number
    courseId:number
    course:Course
    title:string
    description:string
    duration:string
    videoFile:string
    createdAt:Date
    updatedAt:Date
}

export interface IPayloadCourse {
    title?:string
    description?:string
    amount?:number
    currency?:string
}

export interface IPayloadLesson{
    title?:string
    description?:string
    duration?:string
    videoFile?:string
}