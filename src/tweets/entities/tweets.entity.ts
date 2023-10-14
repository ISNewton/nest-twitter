import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column({nullable:true})
  type?: string

  @OneToOne(() => User)
  @JoinColumn()
  user:User

}
