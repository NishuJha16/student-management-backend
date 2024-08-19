import {
  IsNotEmpty,
  IsInt,
  IsString,
  Length,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'The unique student identifier',
    example: 'STU12345',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  student_id: string;

  @ApiProperty({
    description: 'The email of the student',
    example: 'student@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The mobile number of the student',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  mobile_number: string;

  @ApiProperty({
    description: 'The gender of the student',
    example: 'Male',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  gender: string;

  @ApiProperty({
    description: 'The name of the student',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: 'The age of the student',
    example: 18,
  })
  @IsNotEmpty()
  @IsInt()
  age: number;

  @ApiProperty({
    description: 'The class of the student',
    example: '12A',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  class: string;

  @ApiProperty({
    description: 'The roll number of the student, must be unique',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  roll_number: string;

  @ApiProperty({
    description: 'The ID of the user associated with the student',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  user_id?: number;
}
