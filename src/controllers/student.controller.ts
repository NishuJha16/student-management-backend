import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { Student } from '../enitities/student.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { JwtAuthGuard } from 'src/modules/jwt-auth-guard';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Students list',
    type: [Student],
  })
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'The found record', type: Student })
  findOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateStudentDto,
  })
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Delete a student' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: Student,
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.studentService.remove(id);
  }
}
