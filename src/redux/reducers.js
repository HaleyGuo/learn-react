// 一个项目有很多的reducers,我们要把他们整合到一起
import {combineReducers} from "redux";

import counter from './reducers/counter';
import userInfo from './reducers/userInfo';


export default combineReducers({
    counter,
    userInfo
});

//{
//     return {
//         counter:counter(state.counter,action),
//         userInfo:userInfo(state.userInfo,action)
//     }
// }