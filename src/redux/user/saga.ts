import { takeLatest, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from '../router/constants'
import { putUser } from './actions'
import UserService from '../../includes/Services/UserService'
import store from '../index'

export function* userSaga() {

    const response = yield UserService.get();
    
    if (response.result === 'success') {
        yield put(putUser({
            user: response.data.user,
            allowActions: response.data.allowActions
        }));

        store.dispatch({
            type: 'word/GET_DATA',
            payload: null
        })

    } else {

    }

}