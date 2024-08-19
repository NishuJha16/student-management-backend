import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../enitities/student.entity';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentsRepository.findOne({ where: { id } });
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      // Ensure that all required fields are populated
      if (
        !createStudentDto.name ||
        !createStudentDto.age ||
        !createStudentDto.class ||
        !createStudentDto.roll_number ||
        !createStudentDto.student_id ||
        !createStudentDto.email ||
        !createStudentDto.mobile_number ||
        !createStudentDto.gender
      ) {
        throw new HttpException(
          'All fields are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const student = this.studentsRepository.create(createStudentDto);
      return await this.studentsRepository.save(student);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const detail = (error as any).detail;
        if (detail.includes('already exists')) {
          throw new HttpException(
            'Duplicate key error: ' + detail,
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.studentsRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
