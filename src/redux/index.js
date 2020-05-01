import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleWare from 'redux-saga'
import reducer, { browserRouterMiddleware } from './reducer'
import rootSaga from './rootSaga';
import { connectToWebsocket } from '../includes/Services/Websocket';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(reducer, applyMiddleware(logger,  browserRouterMiddleware, sagaMiddleware));

connectToWebsocket(store);

sagaMiddleware.run(rootSaga);

export default store;