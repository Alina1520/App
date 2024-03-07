import { Module } from '@nestjs/common';
import { DatabaseModule, JwtModule } from './libs';
import { $config } from './config';
import { AuthUserModule, PhotographerModule, SessionModule } from './domain';
import { getRestModules } from './rest';

@Module({
  imports: [
    DatabaseModule.forRoot(...$config.getDatabaseConfig()),
    JwtModule.forRoot($config.getjwtTokenConfig()),
    SessionModule.forRoot(),
    PhotographerModule.forRoot(),
    AuthUserModule.forRoot(),
    ...getRestModules()
  ]
})
export class AppModule {}
