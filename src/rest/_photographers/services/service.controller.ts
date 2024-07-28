import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { RestServices } from "./service.service";
import { ReqUser } from "src/libs";
import { CourseCreateDto, CourseUpdateDto, FeedbackDto, FilterDto, LessonCreateDto, LessonUpdateDto, TitleDto } from "./dto";
import { AuthGuard } from "src/domain";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("ph-services")
export class RestServicesController{
    constructor(private readonly servicesService:RestServices){}

    @Post("course")
    @AuthGuard()
    public async createCourse(@ReqUser() userId:number,@Body() dto:CourseCreateDto){
        return await this.servicesService.createCourse(userId,dto)
    }

    @Post("lesson/:courseId")
    public async addLesson(@Param("courseId") courseId:number,@Body() dto:LessonCreateDto){
        await this.servicesService.createLesson(dto,courseId)
    }

    @Patch("course/:id")
    public async editCourse(@Param("id") id:number,@Body() dto:CourseUpdateDto){
        await this.servicesService.editCourse(id,dto)
    }

    @Patch("lesson/:id")
    public async editLesson(@Param("id") id:number,@Body() dto:LessonUpdateDto){
        await this.servicesService.editLesson(dto,id)
    }

    @Get("lessons/:courseId")
    public async getLessons(@Param("courseId") courseId:number){
        return await this.servicesService.getAllLessons(courseId)
    }

    @Get("review/:id")
    public async reviewMyCourse(@Param("id") courseId:number){
        return await this.servicesService.reviewMyCourse(courseId)
    }

    @Get("my-courses")
    @AuthGuard()
    public async getAllMyCourses(@ReqUser() userId:number){
        return await this.servicesService.getAllMyCourses(userId)
    }
    
    @Get("course/:id")
    public async getCourseById(@Param("id") courseId:number){
        return await this.servicesService.getCourseById(courseId)
    }
    
    @Delete("/:id")
    public async deleteCourse(@Param("id") courseId:number){
        return await this.servicesService.deleteCourse(courseId)
    }    
    
    @Get("all-courses")
    @AuthGuard()
    public async getAllCourses(@ReqUser() userId:number){
        return await this.servicesService.getAllCourses(userId)
    }

    @Get("search")
    @AuthGuard()
    public async searchByTitle(@Body() dto:TitleDto,@ReqUser() userId:number){
        return await this.servicesService.searchByTitle(dto,userId)
    }

    @Get("set-filter")
    @AuthGuard()
    public async setFilter(@Query() dto:FilterDto,@ReqUser() userId:number){
        return await this.servicesService.setFilter(dto,userId)
    }

    @Get("counts")
    @AuthGuard()
    public async getCounts(@ReqUser() userId:number){
        return await this.servicesService.getCountOfCourses(userId)
    }
    
    @Get("preview/:id")
    public async viewCourse(@Param("id") courseId:number){
        return await this.servicesService.previewCourse(courseId)
    }
    
    @Post("buy/:id")
    @AuthGuard()
    public async buyCourse(@Param("id") courseId:number,@ReqUser() userId:number){
       await this.servicesService.buyCourse(courseId,userId)
    }

    @Get("purchased")
    @AuthGuard()
    public async getPurschasedCourses(@ReqUser() userId:number){
        return await this.servicesService.getPurchasedCourses(userId)
    }
    
    @Get("purchased/:id")
    @AuthGuard()
    public async continueCourse(@Param("id") id:number,@ReqUser() userId:number){
        return await this.servicesService.getPurchasedCourseById(id,userId)
    }

    @Get("lesson/:courseId/:id")
    @AuthGuard()
    public async showLesson(@Param("id") id:number,@Param("courseId") courseId:number,@ReqUser() userId:number){
        return await this.servicesService.getLessonById(id,courseId,userId)
    }

    @Post("complete/:id")
    @AuthGuard()
    public async completeLesson(@ReqUser() userId:number,@Param("id") id:number){
        await this.servicesService.completeLesson(id,userId)
    }

    @Post("feedback/:courseId")
    @AuthGuard()
    public async createFeedback(
        @ReqUser() userId:number,
        @Param("courseId") courseId:number,
        @Body() dto:FeedbackDto
    ){
        await this.servicesService.createFeedback(courseId,userId,dto)
    }



}
