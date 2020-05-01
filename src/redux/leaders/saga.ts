import { takeLatest, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from '../router/constants'
import { GET_LEADERS, PUT_LEADERS } from './constants'
import { putLeaders, getLeaders, setIsPending, putErrors } from './actions'
import LeadersService from '../../includes/Services/LeadersService'

function* listenLocation(action) {
    const { payload: { pathname } } = action;

    if (pathname !== '/leaders') {
        return;
    }   

    yield put(setIsPending(true));

    const response = yield LeadersService.get();

    if (response.result === 'success') {
        yield put(putLeaders({data: response.data}))
    } else {
        yield put(putErrors(response.errors));
    }

    yield put(setIsPending(false))
}

export function* leadersSaga() {
    yield takeLatest(LOCATION_CHANGE, listenLocation);
}