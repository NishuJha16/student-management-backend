import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './enitities/student.entity';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { User } from './enitities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Nishu@16',
      database: 'school_management',
      entities: [Student, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [StudentController, UserController],
  providers: [StudentService, UserService],
})
export class AppModule {}
