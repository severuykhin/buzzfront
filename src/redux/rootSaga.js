import { put, takeEvery, all } from 'redux-saga/effects'

import { wordSaga } from './word/saga'
import { leadersSaga } from './leaders/saga'
import { websocketSaga } from './websocket/saga'
import { historySaga } from './history/saga'
import { achivmentsSaga } from './achivments/saga'
import { userSaga } from './user/saga'

export default function* init() {
    yield all([
        userSaga(),
        wordSaga(),
        leadersSaga(),
        websocketSaga(),
        historySaga(),
        achivmentsSaga()
    ]);
}