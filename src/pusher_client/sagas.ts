// Call normal functions (functions that are not generators)
// Put JS objects into reducer. Executed by the end of next line, not necessarily immediate.
// Fork a new tree of generators that can be executed in parallel.
// Take a break until an action has been received by the store, capture and return that action object.
// Select a function that take a store and returns a slice, and call it on the current store.

import {fetchJSONOrGetNull, isNumeric, PusherStates, uuidv4} from "./helpers";
import * as Actions from "./actions";
import Pusher, {AuthOptions} from 'pusher-js';
import "core-js/stable";
import "regenerator-runtime/runtime";
import {put, call, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {action_creators, action_types} from "./actions";
import {store} from "./reducers";
import {getChannelName, getSessionStorageKeyName} from "./helpers"
import {getConnectionObject} from "./main";

let pusher = null, channel = null;

const example_values = {
    projTempVerId: "5",
    staffId: "2"
}

export function fetchStaffId() {
    return fetchJSONOrGetNull('/fetchStaffId').then((response) => {
        return isNumeric(response) && response || example_values.staffId;
    }).catch(e => -1)
}

export function fetchProjTempVerId() {
    return fetchJSONOrGetNull('/fetchProjTempVerId').then((response) => {
        return isNumeric(response) && response || example_values.projTempVerId;
    }).catch(e => -1)
}

export function fetchAppKey()
{
    return fetchJSONOrGetNull('/fetchAppKey').then(response => {
        return response[0];
    }).catch(e => -1)
}

export function* setFocusCurrentProjTempVerId(id) {
    yield put({type: action_types.fetchProjTempVerId, projTempVerId: id});
}

export function* serverPromptsClientToQuit() {
}

export function* serverSendsCanKickOutOtherClient() {
}

export function* serverSendsRejectionToEdit() {
}

export function* clientRequestsToKickOut() {
}

export function* initPusherClient() {
    // Enable pusher logging - don't include this in production

    const appKey = yield call(fetchAppKey);
    yield put(action_creators.fetchAppKey(appKey));

    const staffId = yield call(fetchStaffId);
    yield put(action_creators.fetchStaffId(staffId))

    const projTempVerId = yield call(fetchProjTempVerId);

    yield put(action_creators.setFocusId(projTempVerId))
    yield put(action_creators.setProjTempVerId(projTempVerId))
    yield put(action_creators.loadSessionToken())

    pusher = yield call(() => {
        Pusher.logToConsole = true;
        const authToken = getConnectionObject().authToken;
        return new Pusher('12398ade8605b8b69e1e',
            {cluster: 'us2', auth: {params: {"authToken": authToken}}});
    });

    //Pusher Connection listeners
    for (let state of Object.keys(PusherStates)) {
        pusher.connection.bind(state, () => {
            store.dispatch(action_creators.setPusherState(PusherStates[state]))
        })
    }
}

export function* connectToChannel() {
    if (getPusher() == null)
    {
        alert("Pusher is null.");
    }

    channel = yield call((pusherObj) => {
        channel = getConnectionObject().connectChannelInput;
        return pusherObj.subscribe(channel);
    }, getPusher())

    yield call((channelObj) => {
        channelObj.bind('event', function (data) {
            store.dispatch({type: action_types.appendEvent, payload: {event: data?.message}});
        });
    }, channel);
}



export const projectTemplateVersionEditingSaga = [
    initPusherClient
]

export function* rootSaga() {
    yield all(projectTemplateVersionEditingSaga)
}

export function getPusher() {
    return pusher;
}

export function getChannel() {
    return channel;
}