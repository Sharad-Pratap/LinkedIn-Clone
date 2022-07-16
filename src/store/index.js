import { createStore, applyMiddleware } from "redux"
import rootReducer from "/Users/sharad/REACT JS/linkedin-clone/src/reducers/index.js";
import thunkMiddleware from "redux-thunk";


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
