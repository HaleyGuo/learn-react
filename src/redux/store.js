// 维持应用的 state；
// 提供 getState() 方法获取 state；
// 提供 dispatch(action) 触发reducers方法更新 state；
// 通过subscribe(listener) 注册监听器;
// 通过 subscribe(listener) 返回的函数注销监听器。

import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import combineReducers from './reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextCombineReducers = require("./reducers").default;
        store.replaceReducer(nextCombineReducers);
    });
}

export default store;