import { Module } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../enitities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
