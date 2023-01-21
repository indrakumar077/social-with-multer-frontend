import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./store/store"
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"

let persistor = persistStore(store);
ReactDOM.render(

     <Provider store={store}>
     <BrowserRouter>
        {/* <PersistGate persistor={persistor}> */}
               <Routes>
                  <Route path = "*" element={<App/>}/>
               </Routes>
          {/* </PersistGate> */}
     </BrowserRouter>
    </ Provider>,
             
  
  document.getElementById("root")

 
);

