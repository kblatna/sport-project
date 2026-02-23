import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '../../../database/User.schema'
import { RequestWithUser } from '../interface/RequestWithUser.interface'

export const ROLES_KEY = 'roles'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler())
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
        if (!requiredRoles || requiredRoles.length === 0) {
            return true
        }

        const request = context.switchToHttp().getRequest<RequestWithUser>()
        const user = request.user

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
        if (!user) {
            throw new ForbiddenException('User not found in request')
        }

        const hasRole = requiredRoles.includes(user.role)

        if (!hasRole) {
            throw new ForbiddenException(`You need one of these roles: ${requiredRoles.join(', ')}`)
        }

        return true
    }
}
