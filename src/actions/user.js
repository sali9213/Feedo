import { SAVE_USER } from "./types";

export const addUser = userObject => {
    return {
        type: ADD_USER,
        payload: userObject
    }
}