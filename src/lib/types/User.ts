import { Role } from './Role'

export type UserType = {
    user: User
    hasAnswered: boolean
    correctPercentage: number
}

export type User = {
    id: string
    name: string
    email: string
    role: Role
}

export interface UsersType extends Array<UserType>{}