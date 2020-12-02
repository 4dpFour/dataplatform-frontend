// React
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// Pages(容器组件) 
import DashboardPage from "./components/Dashboard/DashboardPage";
import TablePage from "./components/Table/TablePage";
import UrlConfigPage from "./components/UrlConfig/UrlConfigPage";
import MinePage from "./components/Mine/MinePage";
import RegisterForm from './components/Admin/RegisterForm';
import LoginForm from './components/Admin/LoginForm';

import requireAuth from './utils/requireAuth';

export const userRoutes = (
    <div className='container'>
        {/* 重定位 */}
        <Redirect exact from='/' to='/dashboard'></Redirect>
        {/* 路径 */}
        <Switch>
            <Route exact path='/dashboard' component={requireAuth(DashboardPage)}></Route>
            <Route exact path='/table' component={requireAuth(TablePage)}></Route>
            <Route exact path='/urlconfig' component={requireAuth(UrlConfigPage)}></Route>
            <Route exact path='/mine' component={requireAuth(MinePage)}></Route>
        </Switch>
    </div>
)

export const guestRoutes = (
    <div className='container'>
        {/* 重定位 */}
        <Redirect exact from='/login' to='/'></Redirect>
        {/* 路径 */}
        <Switch>
            <Route exact path='/' component={LoginForm}></Route>
            <Route exact path='/register' component={RegisterForm}></Route>
        </Switch>
    </div>
)