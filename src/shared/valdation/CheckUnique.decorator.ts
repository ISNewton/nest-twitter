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

@Injectable()
@ValidatorConstraint({ name: 'isAlreadyRegister', async: true })
export class IsAlreadyRegisterConstraint
    implements ValidatorConstraintInterface {
    constructor() { }

    async validate(value: string, { object, property }: ValidationArguments) {
        const users = dataSource.getRepository(User)

        const userExist = await users.findOne({
            where: {
                [property]: value,
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

export function IsAlreadyRegister(options: ValidationOptions = {}) {
    return function (object: object, propertyName: 'username' | 'email') {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            validator: IsAlreadyRegisterConstraint,
        })
    }
}
