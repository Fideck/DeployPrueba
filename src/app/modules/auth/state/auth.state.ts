import {User} from "../../../core";

export interface AuthState{
    isAuthenticated:boolean;
    isLoading:boolean;
    user:User | null,
    access:string | null,
    refresh: string | null;
    error:string | null
}
