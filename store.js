import { createStore, combineReducers } from "redux";
import { userReducer } from "./src/reducers/UserReducer";
import { APIConfigReducer } from "./src/reducers/APIConfigReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({
    userInfo: userReducer,
    APIConfigInfo: APIConfigReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    timeout: 10000,
    whitelist: ['APIConfigInfo'] //only persists Api config info. Does not persist everything else
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, devToolsEnhancer());
export const persistor = persistStore(store);