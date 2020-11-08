// Call normal functions (functions that are not generators)
// Put JS objects into reducer. Executed by the end of next line, not necessarily immediate.
// Fork a new tree of generators that can be executed in parallel.
// Take a break until an action has been received by the store, capture and return that action object.
// Select a function that take a store and returns a slice, and call it on the current store.
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { fetchJSONOrGetNull, isNumeric, PusherStates } from "./helpers";
import Pusher from 'pusher-js';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { put, call } from 'redux-saga/effects';
import { action_creators, action_types } from "./actions";
import { store } from "./reducers";
import { getConnectionObject } from "./main";
var pusher = null, channel = null;
var example_values = {
    projTempVerId: "5",
    staffId: "2"
};
export function fetchStaffId() {
    return fetchJSONOrGetNull('/fetchStaffId').then(function (response) {
        return isNumeric(response) && response || example_values.staffId;
    }).catch(function (e) { return -1; });
}
export function fetchProjTempVerId() {
    return fetchJSONOrGetNull('/fetchProjTempVerId').then(function (response) {
        return isNumeric(response) && response || example_values.projTempVerId;
    }).catch(function (e) { return -1; });
}
export function fetchAppKey() {
    return fetchJSONOrGetNull('/fetchAppKey').then(function (response) {
        return response[0];
    }).catch(function (e) { return -1; });
}
export function setFocusCurrentProjTempVerId(id) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, put({ type: action_types.fetchProjTempVerId, projTempVerId: id })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function serverPromptsClientToQuit() {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}
export function serverSendsCanKickOutOtherClient() {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}
export function serverSendsRejectionToEdit() {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}
export function clientRequestsToKickOut() {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}
export function initPusherClient() {
    var appKey, staffId, projTempVerId, _loop_1, _i, _a, state;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, call(fetchAppKey)];
            case 1:
                appKey = _b.sent();
                return [4 /*yield*/, put(action_creators.fetchAppKey(appKey))];
            case 2:
                _b.sent();
                return [4 /*yield*/, call(fetchStaffId)];
            case 3:
                staffId = _b.sent();
                return [4 /*yield*/, put(action_creators.fetchStaffId(staffId))];
            case 4:
                _b.sent();
                return [4 /*yield*/, call(fetchProjTempVerId)];
            case 5:
                projTempVerId = _b.sent();
                return [4 /*yield*/, put(action_creators.setFocusId(projTempVerId))];
            case 6:
                _b.sent();
                return [4 /*yield*/, put(action_creators.setProjTempVerId(projTempVerId))];
            case 7:
                _b.sent();
                return [4 /*yield*/, put(action_creators.loadSessionToken())];
            case 8:
                _b.sent();
                return [4 /*yield*/, call(function () {
                        Pusher.logToConsole = true;
                        var authToken = getConnectionObject().authToken;
                        return new Pusher('12398ade8605b8b69e1e', { cluster: 'us2', auth: { params: { "authToken": authToken } } });
                    })];
            case 9:
                pusher = _b.sent();
                _loop_1 = function (state) {
                    pusher.connection.bind(state, function () {
                        store.dispatch(action_creators.setPusherState(PusherStates[state]));
                    });
                };
                //Pusher Connection listeners
                for (_i = 0, _a = Object.keys(PusherStates); _i < _a.length; _i++) {
                    state = _a[_i];
                    _loop_1(state);
                }
                return [2 /*return*/];
        }
    });
}
export function connectToChannel() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (getPusher() == null) {
                    alert("Pusher is null.");
                }
                return [4 /*yield*/, call(function (pusherObj) {
                        channel = getConnectionObject().connectChannelInput;
                        return pusherObj.subscribe(channel);
                    }, getPusher())];
            case 1:
                channel = _a.sent();
                return [4 /*yield*/, call(function (channelObj) {
                        channelObj.bind('event', function (data) {
                            store.dispatch({ type: action_types.appendEvent, payload: { event: data === null || data === void 0 ? void 0 : data.message } });
                        });
                    }, channel)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export var projectTemplateVersionEditingSaga = [
    initPusherClient
];
export function rootSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, all(projectTemplateVersionEditingSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function getPusher() {
    return pusher;
}
export function getChannel() {
    return channel;
}
