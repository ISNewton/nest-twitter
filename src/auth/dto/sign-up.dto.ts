import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { dataSource } from 'src/main'
import { IsEmail, IsString, min } from 'class-validator'
import { IsAlreadyRegister } from '@/shared/valdation/CheckUnique.decorator'
import { Match } from '@/shared/valdation/IsMatch.decorator'

export class SignUpDto {
  @IsEmail()
  @IsAlreadyRegister()
  email: string

  @IsString()
  @IsAlreadyRegister({exceptCurrent : true})
  username: string

  @IsString()
  name:string

  @IsString()
  password:string

  @IsString()
  @Match('password')
  passwordConfirmation:string
}

//export const signUpSchema = z
//  .object({
//    name: z.string(),
//    email: z.string().email(),
//    username: z.string().refine(
//      async (username) => {
//        const users = dataSource.getRepository(User)
//        return !(await users.exist({ where: { username } }))
//      },
//      {
//        message: 'Username already exist',
//        path: ['username'],
//      },
//    ),
//    password: z.string(),
//    passwordConfirmation: z.string(),
//  })
//  .refine((data) => data.password == data.passwordConfirmation, {
//    message: 'Passwords do not match ',
//  })

//// export type signUpDto = z.infer<typeof signUpSchema>
////
//export class signUpDto extends createZodDto(signUpSchema) { }
