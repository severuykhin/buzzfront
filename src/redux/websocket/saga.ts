import { takeLatest, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from '../router/constants'

import { PUT_RANKING, PUT_CURRENT_USER } from '../leaders/constants'
import { putErrors as leadersPutErrors, putLeaders, putCurrentUser, putRanking } from '../leaders/actions'

import { PUT_HISTORY } from '../history/constants'
import { putUnread } from '../history/actions'

import { PUT_BASE_DATA } from '../achivments/constants'
import { putBaseData } from '../achivments/actions'

import { FETCH_MESSAGE } from './constants'
// import { putLeaders, getLeaders, setIsPending, putErrors } from './actions'

function* fetchMessage(action) {
    const {type, payload} = action;

    try {

        const data = JSON.parse(payload.data);
        
        if (data.type === PUT_RANKING) {
            yield put(putRanking(data.data));
        }

        if (data.type === PUT_CURRENT_USER) {
            yield put(putCurrentUser(data.data));
        }

        if (data.type === PUT_HISTORY) {
            yield put(putUnread({
                unreadCount: data.data.unreadCount,
                totalCount: data.data.totalCount
            }));
        }

        if(data.type === PUT_BASE_DATA) {
            yield put(putBaseData({
                unreadCount: data.data.unreadCount,
                totalCount: data.data.totalCount
            }));
        }

        // console.log(action);
        // console.log(data.type);

    } catch (e) {

        console.log(e);
    }
}

export function* websocketSaga() {
    yield takeLatest(FETCH_MESSAGE, fetchMessage);
}