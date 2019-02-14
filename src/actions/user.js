import { SAVE_USER } from "./Types";

export const saveUser = userObject => {
    return {
        type: SAVE_USER,
        payload: userObject
    }
}