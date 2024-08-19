import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { AuthService } from 'src/services/auth.service';

@ApiTags('auth') // Swagger tag for the auth routes
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
