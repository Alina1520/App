import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { User } from "src/domain/users";

@Entity("lessons-completed")
export class CompletedLessons{
    @PrimaryGeneratedColumn()
    id:number

    @Column() 
    userId:number

    @Column() 
    lessonId:number
    
    @ManyToOne(()=>Lesson,ls=>ls.completed,{onDelete:"SET NULL"})
    @JoinColumn({name:"lessonId"})
    lesson:Lesson

    @ManyToOne(()=>User,us=>us.completed,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:User
}