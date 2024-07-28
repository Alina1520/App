import { Module } from '@nestjs/common';
import { DatabaseModule, JwtModule } from './libs';
import { $config } from './config';
import { UserModule, PhotographerModule, SessionModule } from './domain';
import { getRestModules } from './rest';

@Module({
  imports: [
    DatabaseModule.forRoot(...$config.getDatabaseConfig()),
    JwtModule.forRoot($config.getjwtTokenConfig()),
    SessionModule.forRoot(),
    UserModule.forRoot(),
    PhotographerModule.forRoot(),
    ...getRestModules()
  ]
})
export class AppModule {}
