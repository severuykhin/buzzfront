import { deepFreeze } from './Helpers'

let ROOT_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://buzzwordsback.feedler.ru';

const config = {

    socketUrl: process.env.NODE_ENV === 'development' ? `ws://localhost:1234` : `wss://feedler.ru:1234`,

    getWordUrl: `${ROOT_HOST}/get`,
    attemptUrl: `${ROOT_HOST}/attempt`,
    getLeaders: `${ROOT_HOST}/leaders`,
    getHistory: `${ROOT_HOST}/history`,
    getUser: `${ROOT_HOST}/user/identity`,
    getHistorySearch: `${ROOT_HOST}/history/search`,
    readHistoryItems: `${ROOT_HOST}/history/read`,
    getAchivments: `${ROOT_HOST}/achivments/get`,
    readAchivmentsItems: `${ROOT_HOST}/achivments/read`,
    searchWordUrl: `${ROOT_HOST}/word/search`,
    getCategoriesUrl: `${ROOT_HOST}/word/categories`,
    suggestUrl: `${ROOT_HOST}/word/suggest`,
    getAllUrl: `${ROOT_HOST}/word/all`,
    sendVariantsUrl: `${ROOT_HOST}/word/variants`,
    greetUrl: `${ROOT_HOST}/greet`,
    getRequestsUrl: `${ROOT_HOST}/user/requests`,
    cancelRequestsUrl: `${ROOT_HOST}/user/cancel-request`,
};

export default deepFreeze(config);