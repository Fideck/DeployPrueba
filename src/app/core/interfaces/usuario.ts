export interface User{
    id: number,
    name:string,
    last_name:string,
    username:string,
    usertype:string,
    is_active: boolean,
    is_staff: boolean
}

export interface Credentials {
    username:string;
    password:string;
}
