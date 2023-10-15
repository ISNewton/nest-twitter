import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { comparePasswords, hash } from 'src/utils/hash'
import { JwtService } from '@nestjs/jwt'
import { loginData, authResponse } from '@/auth/interfaces/auth.interfaces'
import { ValidationError } from 'class-validator'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(user: any): Promise<authResponse> {
    const newUser = await this.userRepository.save({
      name: user.name,
      email: user.email,
      username: await user.username,
      password: hash(user.password),
    })

    const token = await this.jwtService.signAsync({
      user: {
        name: newUser.name,
        username: user.username,
        email: user.email,
      },
    })

    return {
      name: newUser.name,
      username: newUser.username,
      email: user.email,
      token,
    }
  }

  async login(data: loginData) {
    const user = await this.userRepository.findOneBy({
      username: data.username,
    })

    if (user == null) {
      throw new UnauthorizedException('Incorrect username/email')
    }
    const passwordMatch = comparePasswords(data.password, user.password)

    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect password')
    }

    const token = await this.jwtService.signAsync({
      user: {
        id:user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    })

    return {
      name: user.name,
      username: user.username,
      email: user.email,
      token,
    }
  }
}
