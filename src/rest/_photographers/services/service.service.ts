import { Inject, Injectable } from "@nestjs/common";
import { BOUGHT_REPOSITORY, BoughtRepository, COMPLETED_LESSONS_REPOSITORY, CompletedLessonsRepository, COURSE_REPOSITORY, COURSE_SERVICE, CourseRepository, ICourse, ICourseService, ILesson, LESSON_REPOSITORY, LessonRepository, USER_REPOSITORY, UserRepository } from "src/domain";
import { CourseCreateDto, CourseUpdateDto, FeedbackDto, FilterDto, LessonCreateDto, LessonUpdateDto, TitleDto } from "./dto";
import * as _ from "lodash"
import { FilterationAction } from "./actions";
import { format } from "date-fns";

@Injectable()
export class RestServices{
    @Inject(COURSE_SERVICE)
    private readonly courseService:ICourseService

    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository:CourseRepository

    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository:LessonRepository

    @Inject(COMPLETED_LESSONS_REPOSITORY)
    private readonly completedLessonsRepository:CompletedLessonsRepository

    @Inject(BOUGHT_REPOSITORY) 
    private readonly boughtRepository:BoughtRepository
    

    public async createCourse(userId:number,dto:CourseCreateDto){
        const data = {userId,...dto}
        return await this.courseService.createCourse(data)
    }

    public async editCourse(courseId:number,dto:CourseUpdateDto){
        await this.courseService.editCourse(dto,courseId)
    }

    public async createLesson(dto:LessonCreateDto,courseId:number){
        await this.courseService.createLesson(dto,courseId)
    }

    public async editLesson(dto:LessonUpdateDto,lessonId:number){
        await this.courseService.editLesson(dto,lessonId)
    }

    public async getAllLessons(courseId:number){
        const lessons = await this.getLessonsByCourseId(courseId)
        
        if(lessons && lessons.length>0){
            return this.addNumeration(lessons)
        }else{
             return 
        }
    }

    public async reviewMyCourse(id:number){
        const {course,lessons} = await this.getInfoForViewCourse(id)
        const courseDuration = await this.calculateDurationAndLessons(lessons,course)
        
        return {...course,duration:courseDuration,allLessons:lessons}

    }

    public async getAllMyCourses(userId:number){
        const [courses,count] = await this.courseRepository
        .createQueryBuilder("it")
        .where("it.userId = :userId",{userId})
        .getManyAndCount()
        
        let totalSales = 0;
        let totalEarned = 0;

        const result = await Promise.all(
            courses.map(async course=>{
            const {createdAt,updatedAt,description,userId,...rest} = course
            const active = await this.changeActivation(course)
            totalSales += course.sales
            totalEarned += course.earned

            return {...rest,active}
        }))

        return {courses:result,created:count,totalEarned,totalSales}
    }


    public async getCourseById(id:number){
        const lessons = await this.getLessonsByCourseId(id)
        const {buyers,countBuyers} = await this.getBuyers(id)
        const {feedbacks,reviews} = await this.getFeedbacks(id)

        const course = await this.courseRepository.findOneBy({id})
        const {createdAt,updatedAt,userId,...rest} = course

        return {
            ...rest,
            allLessons:lessons,
            buyers,
            countBuyers,
            feedbacks,
        }
        
    }


    public async deleteCourse(id:number){
        await this.courseService.deleteCourse(id)
    }
    
    public async getAllCourses(userId:number){
        const qb = await this.getBaseCourseQuery(userId)
        const result  = await qb.getMany() 
        return result.length > 0 ? result : "There are no courses for you" 
    }


    public async searchByTitle(dto:TitleDto,userId:number){
        let qb = await this.getBaseCourseQuery(userId)
        const courses = await qb.andWhere("it.title ILIKE :title",{title:`%${dto.title}%`}).getMany()
        return courses.length > 0 ? courses : "There are no courses for you" 
    }

    public async setFilter(dto:FilterDto,userId:number){
        const purchasedIds = await this.getPurchasedIds(userId);
        console.log(purchasedIds)
        
        const filterAction = await new FilterationAction(this.courseRepository,userId,purchasedIds)
        .setParams(dto)
        .get()

        if(filterAction === null) {
            return 'There are no courses for you';
        }

        filterAction.select([
            "it.id",
            "it.title",
            "it.amount",
            "it.currency",
            "it.duration",
            "it.lessons",
            "it.rating",
            "it.reviews",
            "us.firstName",
            "us.lastName",
            "ph.rarity"
        ])

        const filteredCourses = await  filterAction.getMany()
        if (filteredCourses && filteredCourses.length > 0) {
            return filteredCourses
        } else {
            return 'There are no courses suitable for your parameters';
        }    
    }

    public async getCountOfCourses(userId:number){
        const purchasedIds = await this.getPurchasedIds(userId);
        const filterAction =  new FilterationAction(this.courseRepository,userId,purchasedIds)
        
        return await filterAction.getCounts()
    }

    public async previewCourse(id:number){
        return await this.getInfoForViewCourse(id)
    }

    public async buyCourse(id:number,userId:number){
        const course = await this.courseRepository.findOneBy({id})
        
        course.sales += 1
        course.earned += course.amount

        await this.courseService.saveBoughtCourse(id,userId)
        await this.courseRepository.save(course) 
    }
    
    public async getPurchasedCourses(userId:number){
        const boughtCourses  = await this.boughtRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","us")
        .leftJoinAndSelect("it.course","cs")
        .leftJoinAndSelect("us.photographer","ph")
        .where("it.userId = :userId",{userId})
        .select([
            "it.id",
            "it.courseId",
            "cs.title",
            "cs.amount",
            "cs.currency",
            "cs.duration",
            "cs.lessons",
            "cs.rating",
            "us.firstName",
            "us.lastName",
            "ph.rarity"
        ])
        .getMany()

        return await Promise.all(boughtCourses.map(async course=>{
            const progress = await this.calculateProgress(course.courseId,course.course.lessons,userId)
            return {...course,progress}
        }))
    } 

    
    public async getPurchasedCourseById(id:number,userId:number){
        const course = await this.courseRepository
        .createQueryBuilder("it")
        .where("it.id = :id",{id})
        .select([
            "it.lessons",
            "it.duration",
            "it.currency",
            "it.amount",
            "it.title"
        ])
        .getOne()

        const allLessons = await this.getLessonsByCourseId(id)
        const result = await Promise.all(allLessons.map(async ls=>{ls
            const completedStatus = (await this.completedLessonsRepository.findOneBy({lessonId:ls.id,userId})) ? true : false 
            return {...ls,completedStatus}

        }))
        return {course,lessons:result}

    }

    public async getLessonById(id:number,courseId:number,userId:number){
        const lessonsArray = await this.getLessonsByCourseId(courseId)
        const lesson = lessonsArray.find(ls=>ls.id === id)

        const completedStatus = (await this.completedLessonsRepository.findOneBy({lessonId:id,userId})) ? true : false 
        const videoFile = (await this.lessonRepository.findOneBy({id})).videoFile

        return {...lesson,videoFile,completedStatus}
    }

    public async completeLesson(id:number,userId:number){
        await this.courseService.saveCompletedLesson(id,userId)        
    }

    public async createFeedback(courseId:number,userId:number,dto:FeedbackDto){
        const course = await this.boughtRepository.findOneBy({courseId,userId})  
        course.text = dto.text
        course.rating = dto.rating
        course.feedbackTime = new Date().toLocaleDateString('en-US',{
            month:"long",
            year:"numeric",
            day:"numeric",
        })     
        
        await this.boughtRepository.save(course)

        const query = await this.courseRepository.findOneBy({id:courseId})
        await this.saveReviewsAndRating(query,dto.rating)
    }


    private async saveReviewsAndRating(course:ICourse,rating:number){
        const {feedbacks,reviews} = await this.getFeedbacks(course.id)
        course.reviews += 1
        course.rating = (rating + course.rating) / reviews
        await this.courseRepository.save(course)
    }

    private async getFeedbacks(courseId:number){
        const [feedbacks,reviews] = await this.boughtRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","us")
        .where("it.courseId = :courseId",{courseId})
        .select([
            "it.rating",
            "it.text",
            "it.feedbackTime",
            "us.firstName",
            "us.lastName",
        ])
        .getManyAndCount()
        return {feedbacks,reviews}
    }

    private async calculateProgress(courseId:number,countLessons:number,userId:number){
        const lessons = await this.lessonRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.completed","cmp")
        .where("it.courseId = :courseId",{courseId})
        .andWhere("cmp.userId = :userId",{userId})
        .getCount()
        
        const result = Math.floor(lessons / countLessons * 100)
        return result        
    }

    private async getBuyers(courseId:number){
        const buyers = await this.boughtRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","user")
        .where("it.courseId = :courseId",{courseId})
        .select([
            "it.id",
            "it.rating",
            "user.firstName",
            "user.lastName",
            "user.city",
            "user.country"
        ])
        .getMany(); 

        return {buyers,countBuyers:buyers.length}
    }
    
    private async getPurchasedIds(userId:number){
        const courses =  await this.boughtRepository
        .createQueryBuilder("it")
        .where("it.userId = :userId",{userId})
        .getMany()

        return courses.map(course=>course.courseId)
    }
    
    private async getBaseCourseQuery(userId:number) {
        const purchasedIds = await this.getPurchasedIds(userId);
    
        const query = this.courseRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user", "us")
        .leftJoinAndSelect("us.photographer", "ph")
        .where("it.userId != :userId", { userId })
        .select([
            "it.id",
            "it.title",
            "it.amount",
            "it.currency",
            "it.duration",
            "it.lessons",
            "it.rating",
            "it.reviews",
            "us.firstName",
            "us.lastName",
            "ph.rarity"
        ]);

       if (purchasedIds.length > 0) {
        query.andWhere("it.id NOT IN (:...ids)", { ids: purchasedIds });
       }

       return query;
    }

    private async getInfoForViewCourse(id:number){
        const course = await this.courseRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","us")
        .leftJoinAndSelect("us.photographer","ph")
        .where("it.id = :id",{id})
        .select([
            "it.id",
            "it.currency",
            "it.amount",
            "it.rating",
            "it.reviews",
            "it.title",
            "it.description",
            "it.duration",
            "it.lessons",
            "us.city",
            "us.country",
            "us.accountType",
            "us.firstName",
            "us.lastName",
            "ph.avatar",
            "ph.amount",
            "ph.per",
            "ph.currency",
            "ph.jobs",
            "ph.rating",
            "ph.rarity",
        ])
        .getOne()

        const lessons =  await this.getLessonsByCourseId(id)

        return {course,lessons}
    }

    private async getLessonsByCourseId(id:number,completed?:boolean){
        const lessons =  await this.lessonRepository
        .createQueryBuilder("it")
        .where("it.courseId = :id",{id})
        .orderBy("it.id","ASC")
        .select([
            "it.id",
            "it.title",
            "it.description",
            "it.duration",
        ])
        .getMany()


        return this.addNumeration(lessons)
    }

    private addNumeration(lessons:ILesson[],completed=false){
        return lessons.map((ls, index) => {
            const lessonWithNumeration = { ...ls, numeration: index + 1 };
            if (completed) {
                return { ...lessonWithNumeration, completed };
            }
            return lessonWithNumeration;
        });
    }

    private async changeActivation(course:ICourse){
        if(course.sales > 0){
            await this.courseRepository.save({...course,active:true})
        }
    }

    private async calculateDurationAndLessons(lessons,course:ICourse){
        let totalMinutes = 0;

        lessons[0].map(ls=>{
            const {hours,minutes} = this.parseDuration(ls.duration)
            totalMinutes += (hours * 60) + minutes
        })

        const courseDuration = this.sumDuration(totalMinutes)
        const countLessons = lessons[1]

        await this.courseRepository.save({...course,duration:courseDuration,lessons:countLessons})
        return courseDuration
    }

    private  sumDuration(totalMinutes:number){
        const totalHours = Math.floor(totalMinutes / 60)
        const remainingMinutes = totalMinutes % 60

        const duration = (totalHours>0) ? `${totalHours}h ${remainingMinutes}m` : `${remainingMinutes}m`

        return duration
    }

    private parseDuration(duration:string){
        const hoursMatch = duration.match(/(\d+)h/)
        const minutesMatch = duration.match(/(\d+)m/)

        const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

        return { hours, minutes };
    }
}