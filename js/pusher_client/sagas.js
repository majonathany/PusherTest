// Call normal functions (functions that are not generators)
// Put JS objects into reducer. Executed by the end of next line, not necessarily immediate.
// Fork a new tree of generators that can be executed in parallel.
// Take a break until an action has been received by the store, capture and return that action object.
// Select a function that take a store and returns a slice, and call it on the current store.

import {fetchJSONOrGetNull, uuidv4} from "./helpers";
import * as Actions from "./actions";
import Pusher from 'pusher-js';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { put, call, take, takeEvery, takeLatest } from 'redux-saga/effects'
import {action_types, Types} from "./actions";
import {store} from "./reducers";

export let pusher, channel;

export function fetchStaffId()
{
    return fetchJSONOrGetNull('/fetchStaffId').then((response) => {
        return response;
    }).catch(e => -1)
}

export function fetchProjTempVerId()
{
    return fetchJSONOrGetNull('/fetchProjTempVerId').then((response) => {
        return response;
    }).catch(e => -1)
}

export function* setFocusCurrentProjTempVerId(id)
{
    yield put ({type: action_types.fetchProjTempVerId, projTempVerId: id});
}

export function* serverPromptsClientToQuit() {}

export function* serverSendsCanKickOutOtherClient() {}

export function* serverSendsRejectionToEdit(){}

export function* clientRequestsToKickOut() {}

export function* initPusherClient() {
    // Enable pusher logging - don't include this in production

    const staff_id = yield call(fetchStaffId);
    yield put({type: action_types.fetchStaffId, staff_id: staff_id["staffid"]})

    const projTempVerId = yield call(fetchProjTempVerId);
    yield put({type: action_types.fetchProjTempVerId, version_id: projTempVerId["id"]["id"]})

    yield put({type: action_types.setFocusId, id: projTempVerId["id"]["id"]})
    yield put({type: action_types.loadSessionToken})

    pusher = yield call( () => {
        Pusher.logToConsole = true;
        return new Pusher('12398ade8605b8b69e1e', {cluster: 'us2'});
    });

    channel = yield call((pusherObj) => {
        return pusherObj.subscribe('my-channel');
    }, pusher)

    yield call((channelObj) => {
        channelObj.bind('my-event', function(data) {
            store.dispatch({type: action_types.appendEvent, event: data});
        });
    }, channel);
}

export const projectTemplateVersionEditingSaga = [
    initPusherClient
]

export function* rootSaga() {
    yield all(projectTemplateVersionEditingSaga)
}