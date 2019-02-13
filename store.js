import { createStore, combineReducers } from "redux";
import { userReducer } from "./src/reducers/userReducer";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
    userInfo: userReducer
})

const configureStore = () => {
    return createStore(rootReducer, devToolsEnhancer())
}

export default configureStore;