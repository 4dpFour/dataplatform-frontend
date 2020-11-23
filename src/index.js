// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Redux Reducer
import rootReducer from "./redux/reducers/index";

// Ant Design组件库
import 'antd/dist/antd.css';

// App
import App from "./components/App";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

// 入口
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);