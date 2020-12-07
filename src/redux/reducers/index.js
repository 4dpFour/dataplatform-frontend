// Redux
import { combineReducers } from "redux";

// Redux Reducer
import header from "./header";
import dataTable from "./dataTable";
import auth from './auth';
import urlConfig from './urlConfig';
import dashboard from './dashboard';

const rootReducer = combineReducers({
    header, dataTable, auth, urlConfig, dashboard
})

export default rootReducer;