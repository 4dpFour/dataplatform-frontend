// Redux
import { combineReducers } from "redux";

// Redux Reducer
import header from "./header";
import dataTable from "./dataTable";

const rootReducer = combineReducers({
    header, dataTable
})

export default rootReducer;