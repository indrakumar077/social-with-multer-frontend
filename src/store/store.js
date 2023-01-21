import authReducer  from "./authSlice"
import postSlice from "./postSlice";
import getTimelineSlice from "./getTimelineSlice";
import { combineReducers } from "@reduxjs/toolkit";

import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk";


  const reducers = combineReducers({
    userData : authReducer,
    postStatus : postSlice,
    timelinePosts : getTimelineSlice,
  
})
  
  
  function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();
  
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
  
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;


















































// import authReducer  from "./authSlice"
// import postSlice from "./postSlice";
// import getTimelineSlice from "./getTimelineSlice";
// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import{persistReducer} from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";
// // import {
// //     persistStore,
// //     persistReducer,
// //     FLUSH,
// //     REHYDRATE,
// //     PAUSE,
// //     PERSIST,
// //     PURGE,
// //     REGISTER,
// //   } from 'redux-persist'

// const persistConfig= {
//       key : "root",
//       version: 1,
//       storage,
// }
// const reducer = combineReducers({
//     userData : authReducer,
//     postStatus : postSlice,
//     timelinePosts : getTimelineSlice,
  
// })

// const persistedReducer =  persistReducer(persistConfig,reducer);

// const store  = configureStore({

//     reducer : persistedReducer,
//     // middleware: (getDefaultMiddleware) =>
//     // getDefaultMiddleware({
//     //   serializableCheck: {
//     //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],serializableCheck: false,
//     //   },
//     // }),
   
// })

// export default store;
