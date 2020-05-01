import { takeLatest, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from '../router/constants'
import { READ_ITEMS } from './constants'
import {  putIsPending, putAllData, putErrors } from './actions'
import AchivmentsService from '../../includes/Services/AchivmentsService'

function* listenLocation(action) {
    const { payload: { pathname } } = action;

    if (pathname !== '/achivments') {
        return;
    }   

    yield put(putIsPending(true));

    let response = yield AchivmentsService.get();

    if (response.result === 'success') {
        yield put(putAllData(response.data));
    } else {
        yield put(putErrors([
            'Кажется, что-то пошло нет так. Попробуйте позднее.'
        ]));
    }

    yield put(putIsPending(false));
}

function* listenReadItems(action) {
    yield AchivmentsService.read();
}



export function* achivmentsSaga() {
    yield takeLatest(LOCATION_CHANGE, listenLocation);
    yield takeLatest(READ_ITEMS, listenReadItems)
}