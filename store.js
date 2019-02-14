import { createStore, combineReducers } from "redux";
import { userReducer } from "./src/reducers/UserReducer";
import { APIConfigReducer } from "./src/reducers/APIConfigReducer";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
    userInfo: userReducer,
    APIConfigInfo: APIConfigReducer
})

const configureStore = () => {
    return createStore(rootReducer, devToolsEnhancer())
}

export default configureStore;