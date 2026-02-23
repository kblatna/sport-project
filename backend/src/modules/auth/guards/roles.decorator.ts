import { SetMetadata, CustomDecorator } from '@nestjs/common'
import { ROLES_KEY } from './roles.guard'

export const Roles = (...roles: string[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles)
