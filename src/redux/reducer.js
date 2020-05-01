import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { routerReducer as router,
    routerMiddleware } from "react-router-redux";

import { reducer as wordReducer } from './word/reducer'
import { MODULE_NAME as wordModule } from './word/constants'

import { reducer as leadersReducer } from './leaders/reducer'
import { MODULE_NAME as leadersModule } from './leaders/constants'

import { reducer as historyReducer } from './history/reducer'
import { MODULE_NAME as historyModule } from './history/constants'

import { reducer as achivmentsReducer } from './achivments/reducer'
import { MODULE_NAME as achivmentsModule } from './achivments/constants'

import { reducer as userReducer } from './user/reducer'
import { MODULE_NAME as userModule } from './user/constants'

export const history = createBrowserHistory();
export const browserRouterMiddleware = routerMiddleware(history);

export default combineReducers({
    router,
    [userModule]: userReducer,
    [wordModule]: wordReducer,
    [leadersModule]: leadersReducer,
    [historyModule]: historyReducer,
    [achivmentsModule]: achivmentsReducer
});