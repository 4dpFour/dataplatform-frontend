// Redux
import { combineReducers } from "redux";

// Redux Reducer
import header from "./header";
import dataTable from "./dataTable";
import auth from './auth';

const rootReducer = combineReducers({
    header, dataTable, auth
})

export default rootReducer;