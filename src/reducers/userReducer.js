import { SAVE_USER } from "../actions/types";
import { combineReducers } from "redux";

const initialState = {
    user: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USER: return { user: action.payload }; default: return state;
    }
    
}

export default combineReducers({
    User: userReducer
})