import { SAVE_API_CONFIG } from "../actions/Types";

const initialState = {
    IPAddress: 'Initial IP',
    DBKey: 'Initial DBKey'
};

export const APIConfigReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_API_CONFIG:
            console.log(action)
            return { IPAddress: action.payload.IPAddress, DBKey: action.payload.DBKey }; 
        default: 
            return state;
    }
    
}
