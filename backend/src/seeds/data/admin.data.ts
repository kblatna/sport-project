import * as bcrypt from 'bcrypt'

/**
 * Note: Passwords are hashed synchronously here for seeding purposes.
 * In production code, always use async bcrypt.hash()
 */

const hashPasswordSync = (password: string): string => {
    return bcrypt.hashSync(password, 10)
}

export const adminUsers = [
    {
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashPasswordSync('Admin123!'),
        role: 'admin',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        lastLogin: null,
        updatedAt: new Date('2024-01-01')
    },
    {
        name: 'Editor User',
        email: 'editor@example.com',
        password: hashPasswordSync('Editor123!'),
        role: 'editor',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        lastLogin: null,
        updatedAt: new Date('2024-01-01')
    }
]
