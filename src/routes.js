// React
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Pages(容器组件) 
import DashboardPage from "./components/Dashboard/DashboardPage";
import TablePage from "./components/Table/TablePage";
import UrlConfigPage from "./components/UrlConfig/UrlConfigPage";
import MinePage from "./components/Mine/MinePage";

export default (
    <div className='container'>
        {/* 重定位 */}
        <Redirect exact strict from="/" to="/dashboard"></Redirect>
        <Route exact path='/dashboard' component={DashboardPage}></Route>
        <Route exact path='/table' component={TablePage}></Route>
        <Route exact path='/urlconfig' component={UrlConfigPage}></Route>
        <Route exact path='/mine' component={MinePage}></Route>
    </div>
)