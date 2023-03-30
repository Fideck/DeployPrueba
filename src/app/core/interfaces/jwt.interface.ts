import { User } from './usuario';
export interface IJWTResponse{
    access:string | null,
    refresh:string | null,
    user:User | null
}
