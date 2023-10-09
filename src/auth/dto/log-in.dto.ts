import { createZodDto } from 'nestjs-zod'
import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { dataSource } from '@/main'

import { IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}

// export const loginSchema = z.object({
//   username: z.string(),
//   password: z.string(),
// })

// const source =  InjectDataSource(User)

// export type signUpDto = z.infer<typeof signUpSchema>
//
// export class loginDto extends createZodDto(loginSchema) { }
