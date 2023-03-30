import {createActionGroup, props} from "@ngrx/store";
import {Credentials, IJWTResponse} from "../../../core";

export const authActions = createActionGroup({
    source:"auth",
    events:{
        'Start Login':props<Credentials>(),
        'Login Success':props<{response:IJWTResponse}>(),
        'Login Failure': props<{error:string}>(),
        'Start Logout':props<{username:string}>(),
        'Logout Success': props<{username:string}>()
    }
})
