import { Inject, Injectable } from "@nestjs/common";
import { AUTH_USER_SERVICE, AccountType, CLIENT_REPOSITORY, COURSE_REPOSITORY, Categories, ClientRepository, CourseRepository, Gender, IAuthUserService, IOnBoardService, IPhotographerRepository, ISessionService, JOB_REPOSITORY, JobRepository, LESSON_REPOSITORY, LessonRepository, PHOTOGRAPHERS_REPOSITORY, SESSION_SERVICE, TypePriceEnum, USER_BOARD_SERVICE, USER_REPOSITORY, UserRepository, UserRole } from "src/domain";
import {faker} from "@faker-js/faker"
import { format } from 'date-fns'

@Injectable()
export class RestSeedService{
    @Inject(AUTH_USER_SERVICE) private readonly userService:IAuthUserService
    @Inject(USER_REPOSITORY) private readonly userRepository:UserRepository
    @Inject(SESSION_SERVICE) private readonly sessionService:ISessionService
    @Inject(PHOTOGRAPHERS_REPOSITORY) private readonly phRepository:IPhotographerRepository
    @Inject(JOB_REPOSITORY) private readonly jobRepository:JobRepository
    @Inject(CLIENT_REPOSITORY) private readonly clientRepository:ClientRepository
    @Inject(COURSE_REPOSITORY) private readonly courseRepository:CourseRepository
    @Inject(LESSON_REPOSITORY) private readonly lessonRepository:LessonRepository

    public async storeUser(){
        let userId,session,user,saving
            for(let i = 0; i < 10; i++){
                userId = await this.userService.signUp(this.generateFakeUserData())
                session = await this.sessionService.start(userId)
                user = await this.userRepository.findOneBy({id:userId})
                saving = {...user,...this.generateFakeBoardData()}
                await this.userRepository.save(saving)
            }
    }

    public async storePhotographers(){
        const phs = await this.userRepository
        .createQueryBuilder("it")
        .where("it.role = :role",{role:UserRole.Photographer})
        .getMany()

        let photographer
        for (const ph of phs) {
            photographer = this.phRepository.create({userId:ph.id})
            await this.phRepository.save({...photographer,...this.generateFakePhData()})
        }
    }
    
    public async storeClients(){
        const cls = await this.userRepository
        .createQueryBuilder("it")
        .where("it.role = :role",{role:UserRole.Client})
        .getMany()
    
        let client
        for (const cl of cls) {
            client = this.clientRepository.create({userId:cl.id})
            await this.clientRepository.save(client)
        }
        
    }

    public async storeJobs(){
        const cls = await this.userRepository
        .createQueryBuilder("it")
        .where("it.role = :role",{role:UserRole.Client})
        .getMany()

        let job
        for (const cl of cls) {
            job = this.jobRepository.create({userId:cl.id})
            await this.jobRepository.save({...job,...this.generateFakeJobData()})
        }
    }


    public async createCourse(){
        const phs = await this.userRepository
        .createQueryBuilder("it")
        .where("it.role = :role",{role:UserRole.Photographer})
        .getMany()

        let course
        for (const ph of phs){
            course = this.courseRepository.create({userId:ph.id}) 
            await this.courseRepository.save({...course})           
        }
    }

    private generateFakeJobData(){
        const categories = Object.values(Categories)
        const typePrice = Object.values(TypePriceEnum)
        const country = faker.location.countryCode('alpha-2')
        const city =  faker.location.city()

        const randomTime = faker.date.anytime(); 
        const time = format(randomTime, 'h:mm a')

        const randomDate = faker.date.anytime();
        const formattedDate = format(randomDate, 'MMMM d, yyyy');

        return {
            category:faker.helpers.arrayElement(categories),
            amount:faker.number.int({min:100,max:5500}),
            currency:faker.helpers.arrayElement(['USD','KWD','SAR']),
            studio:faker.helpers.arrayElement([true,false]),
            pickup:faker.helpers.arrayElement([true,false]),
            description:faker.lorem.paragraph(),
            headline:faker.lorem.sentence(),
            location:`${city},${country}`,
            participants:faker.number.int({min:1,max:3}),
            duration:faker.number.int({min:1,max:6}),
            typePrice:faker.helpers.arrayElement(typePrice),
            time:time,
            data:formattedDate
        }

    }

    private generateFakePhData(){
        const categories = Object.values(Categories)
        return {
            speciality:faker.helpers.arrayElements(categories),
            amount:faker.number.int({min:100,max:5500}),
            per:"hr",
            currency:faker.helpers.arrayElement(['USD','KWD','SAR']),
            studio:faker.helpers.arrayElement([true,false]),
            delivery:faker.helpers.arrayElement([true,false]),
            aboutYou:faker.lorem.paragraph(),
            rating:faker.number.float({min:1,max:5}),
        }
    }

    private generateFakeBoardData(){
        const genders = Object.values(Gender)
        const roles = Object.values(UserRole)
        const accType = Object.values(AccountType)
        return {
                country: faker.location.countryCode('alpha-2'),
                city: faker.location.city(),
                latitude: faker.number.int(7),
                longitude: faker.number.int(7),
                gender: faker.helpers.arrayElement(genders),
                role: faker.helpers.arrayElement(roles),
                accountType: faker.helpers.arrayElement(accType),
        }
    }

    private generateFakeUserData(){
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const pass = "123"
            
        return {
                firstName,
                lastName,
                email : faker.internet.email({firstName, lastName} ),
                pass : pass,
                repeatPass : pass,
            };
        }
}
