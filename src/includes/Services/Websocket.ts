import Config from '../Config';
import { fetchMessage } from '../../redux/websocket/actions'
import UrlParams from '../UrlParams';

const _UrlParams = new UrlParams();

function heartbeat(websocket) {
    if (!websocket)
        return;

    if (websocket.readyState !== 1)
        return;

    websocket.send("heartbeat");

    setTimeout(function () {
        heartbeat(websocket);
    }, 3000);
}

function createWebsocket(store) {
    const websocket = new WebSocket(`
        ${Config.socketUrl}${window.location.search}
    `);

    websocket.onopen = function () {
        // store.dispatch(websocketActions.putWebsocket({ websocket }));

        heartbeat(websocket);
    }

    websocket.onclose = function (event) {
        // store.dispatch(websocketActions.putWebsocket({ websocket: false }));

        setTimeout(function () {
            createWebsocket(store);
        }, 5000);
    }

    websocket.onmessage = function (event) {
        store.dispatch(fetchMessage(event))
        // store.dispatch(websocketActions.fetchWebsocketMessages({ event }));
    };
}


export function connectToWebsocket(store) {
    if (!Config.socketUrl)
        return;

    createWebsocket(store);
}