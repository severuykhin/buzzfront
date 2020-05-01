import { takeLatest, put } from 'redux-saga/effects'
import WordService from '../../includes/Services/WordService';
import { LOCATION_CHANGE } from '../router/constants'
import { MAKE_ATTEMPT, GET_DATA } from './constants'
import { setData, setIsPending, setStatus, getData, setOutOfData } from './actions'
import { putAllowActions } from '../user/actions'
import store from '../index'

function* listenLocation(action) {
    const { payload: { pathname } } = action;

    if (pathname !== '/') {
        return;
    }   

    if (!store.getState().user.data) {
        return;
    }

    yield put(setIsPending(true));

    const response = yield WordService.get();
    
    if (response.result === 'success') {

        switch(response.data.gameStatus) {
            case 'active':
                yield put(setData(response.data));
                break;
            case 'out_of_data':
                yield put(setOutOfData(response.data));
                break;
            default:
                yield put(setIsPending(false))
                break;        
        }

        yield put(putAllowActions(response.data.allowActions))

    } else {
        yield put(setIsPending(false))
    }
}

function* listenGetData(action) {
    yield put(setIsPending(true));

    const response = yield WordService.get();
    
    if (response.result === 'success') {

        switch(response.data.gameStatus) {
            case 'active':
                yield put(setData(response.data));
                break;
            case 'out_of_data':
                yield put(setOutOfData(response.data));
                break;
            default:
                yield put(setIsPending(false));
                break;       
        }

        yield put(putAllowActions(response.data.allowActions));

    } else {
        yield put(setIsPending(false))
    }
}

function* listenMakeAttempt(action) {
    const { payload } = action;
    const response = yield WordService.attempt(payload)
    
    if (response.status === 'success') {
        yield put(setStatus(response.response.status));
    } else {
        console.log(response);
        /**
         * @TODO handle error
         */
    }
}

export function* wordSaga() {
    yield takeLatest(LOCATION_CHANGE, listenLocation);
    yield takeLatest(MAKE_ATTEMPT, listenMakeAttempt);
    yield takeLatest(GET_DATA, listenGetData);
}