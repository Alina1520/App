import { Inject, Injectable } from "@nestjs/common";
import { BOUGHT_REPOSITORY, BoughtRepository, COMPLETED_LESSONS_REPOSITORY, CompletedLessonsRepository, COURSE_REPOSITORY, CourseRepository, ICourse, ICourseService, IPayloadCourse, IPayloadLesson, LESSON_REPOSITORY, LessonRepository } from "../typing";

@Injectable()
export class CourseService implements ICourseService{
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository:CourseRepository

    @Inject(LESSON_REPOSITORY) 
    private readonly lessonRepository:LessonRepository

    @Inject(COMPLETED_LESSONS_REPOSITORY) 
    private readonly completedLessonsRepository:CompletedLessonsRepository

    @Inject(BOUGHT_REPOSITORY) 
    private readonly boughtRepository:BoughtRepository

    public async createCourse(data:IPayloadCourse){
        const course = this.courseRepository.create({...data})
        await this.courseRepository.save(course)
        return course.id
    }

    public async editCourse(changedData:IPayloadCourse,courseId:number){
        const course  = await this.courseRepository.findOneBy({id:courseId})
        const changedCourse = {...course,...changedData}
        await this.courseRepository.save(changedCourse)
    }
    
    public async createLesson(data:IPayloadLesson,courseId:number){
        const lesson = this.lessonRepository.create({...data,courseId})
        await this.lessonRepository.save(lesson)
    }
    
    public async editLesson(changedData:IPayloadLesson,lessonId:number){
        const lesson  = await this.lessonRepository.findOneBy({id:lessonId})
        const changedLesson = {...lesson,...changedData}
        await this.lessonRepository.save(changedLesson)
    } 

    public async deleteCourse(id:number){
        await this.courseRepository.delete({id})
    }
    
    public async saveCompletedLesson(lessonId:number,userId:number){
        const lesson = this.completedLessonsRepository.create({lessonId,userId})
        await this.completedLessonsRepository.save(lesson)
    }

    public async saveBoughtCourse(courseId:number,userId:number){
        const course = this.boughtRepository.create({courseId,userId})
        await this.boughtRepository.save(course)
    }
}