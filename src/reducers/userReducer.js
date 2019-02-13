import { SAVE_USER } from "../actions/types";

const initialState = {
    user: null
};

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USER: return { user: action.payload }; default: return state;
    }
    
}
