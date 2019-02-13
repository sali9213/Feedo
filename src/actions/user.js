import { SAVE_USER } from "./types";

export const saveUser = userObject => {
    return {
        type: SAVE_USER,
        payload: userObject
    }
}