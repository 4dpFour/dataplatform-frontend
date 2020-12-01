// React
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// Pages(容器组件) 
import DashboardPage from "./components/Dashboard/DashboardPage";
import TablePage from "./components/Table/TablePage";
import UrlConfigPage from "./components/UrlConfig/UrlConfigPage";
import MinePage from "./components/Mine/MinePage";
export default (
    <div className='container'>
        {/* 重定位 */}
        <Redirect exact strict from='/' to='/dashboard'></Redirect>
        {/* 路径 */}
        <Switch>
            <Route exact strict path='/dashboard' component={DashboardPage}></Route>
            <Route exact strict path='/table' component={TablePage}></Route>
            <Route exact strict path='/urlconfig' component={UrlConfigPage}></Route>
            <Route exact strict path='/mine' component={MinePage}></Route>
        </Switch>
    </div>
)