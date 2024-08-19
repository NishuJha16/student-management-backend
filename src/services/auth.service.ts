import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/enitities/user.entity';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password, role } = registerUserDto;

    // Check if the user already exists
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (existingUser) {
      throw new HttpException('Username already taken', HttpStatus.CONFLICT);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });

    return this.usersRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto;

    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
