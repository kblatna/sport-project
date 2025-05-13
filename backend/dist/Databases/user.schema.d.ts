import { type HydratedDocument } from 'mongoose';
export declare class User {
    name: string;
    email: string;
    createdAt: Date;
}
export declare const UserSchema: any;
export type UserDocument = HydratedDocument<User>;
export type UserLeanDocument = LeanDocument<UserDocument>;
