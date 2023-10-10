import { Injectable } from '@nestjs/common'
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { dataSource } from 'src/main'
import { User } from 'src/users/entities/user.entity'

// import { AuthenticationService } from '~auth/services/authentication.service';
//
interface Arguments extends ValidationArguments {
    except: number
}

@Injectable()
@ValidatorConstraint({ name: 'isAlreadyRegister', async: true  })
export class IsAlreadyRegisterConstraint
    implements ValidatorConstraintInterface {
    constructor() { }

    async validate(value: string, a: Arguments) {
        console.log('except' , a)
        // console.log('value' , value)
        // console.log('object' , object)
        // console.log('property' , property)
        const users = dataSource.getRepository(User)

        const userExist = await users.findOne({
            where: {
                [a.property]: value,
            },
        })

        return !userExist

        // const userExist = await this.authenticationService.isRegistered({
        //   [property]: value,
        //   // @ts-expect-error object has an id property and it's defined
        //   id: object.id as unknown,
        // });

        // return !userExist;
    }

    defaultMessage(): string {
        return '$property is already registered'
    }
}

interface Options {
    exceptCurrent?:boolean
}

export function IsAlreadyRegister(exceptCurrent:Options = {}  , options: ValidationOptions  = {}) {
    return function (object: object, propertyName: 'username' | 'email') {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [exceptCurrent],
            validator: IsAlreadyRegisterConstraint,
        })
    }
}
