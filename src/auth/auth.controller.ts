import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { SignUpDto } from '@/auth/dto/sign-up.dto'
import { LoginDto } from '@/auth/dto/log-in.dto'
import { AuthService } from './auth.service'
import { User } from 'src/users/entities/user.entity'
// import { signUpSchema } from './sign-up.dto'
import { ZodValidationPipe } from 'nestjs-zod'
import { AuthGuard } from './auth.guard'
import { authResponse, loginData } from '@/auth/interfaces/auth.interfaces'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  // @UsePipes(new ZodValidationPipe(signUpSchema))
  signUp(@Body() user: SignUpDto): Promise<authResponse> {
    // console.log(user)
    // return user
    const newUser = this.authService.signUp(user)
    return newUser
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<authResponse> {
    const user = await this.authService.login(data)
    return user
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user
  }
}
