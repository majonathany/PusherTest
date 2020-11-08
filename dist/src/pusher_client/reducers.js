var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
import { ChannelTypePrefixes, uuidv4 } from "./helpers";
import { action_types } from './actions';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';
// initialProjectTemplateVersionClientState
// This is the state for the current user. There is a difference between the current project the user
// is editing, and his open sessions.
var initState = {
    channelTypeInput: ChannelTypePrefixes.PUBLIC,
    currentProjectVersionId: -1,
    authToken: "",
    appKey: "",
    staffId: "",
    makeChannelInput: "",
    connectChannelInput: "",
    sessions: [{
            projTempVerId: -1,
            sessionStorageToken: -1,
            canEdit: false,
            isEditing: false,
            eventLog: []
        }]
};
// Takes a reducer function, extracts the session of interest, performs the reduction, and returns the correct store.
var sessionReducerHelper = function (state, action, reducer) {
    var possibleSessions = state.sessions.filter(function (session) {
        return session.projTempVerId === state.currentProjectVersionId;
    });
    var currentSession = possibleSessions.slice(-1)[0] || initState.sessions[0];
    currentSession = reducer(currentSession, action);
    return __assign(__assign({}, state), { sessions: __spreadArrays(state.sessions.filter(function (clientSession) {
            return clientSession.projTempVerId !== state.currentProjectVersionId;
        }), [currentSession]) });
};
var setStaffId = function (state, action) {
    state.staffId = action.payload.staffId;
    return state;
};
var setProjTempVerId = function (state, action) {
    return sessionReducerHelper(state, action, function (currentSession, given_action) {
        currentSession.projTempVerId = given_action.payload.id;
        return currentSession;
    });
};
var fetchAppKey = function (state, action) {
    state.appKey = action.payload.appKey;
    return state;
};
// Sets current Project Template Version ID
var setFocusId = function (state, action) {
    state.currentProjectVersionId = action.payload.id;
    return state;
};
// Sets the current session token.
var setCurrentSessionToken = function (state, action) {
    return sessionReducerHelper(state, action, function (currentSession, given_action) {
        if (currentSession.projTempVerId === -1) {
            console.debug('Cannot set session token when projTempVerId is null');
        }
        else {
            var sessionStorageKey = "projTempVer-" + currentSession.projTempVerId + "-SessionToken";
            currentSession.sessionStorageToken = sessionStorage.getItem(sessionStorageKey) || uuidv4();
        }
        return currentSession;
    });
};
var setMakeChannelInput = function (state, action) {
    state.makeChannelInput = action.payload.makeChannelInput;
    return state;
};
var setConnectChannelInput = function (state, action) {
    state.connectChannelInput = action.payload.connectChannelInput;
    return state;
};
// Events in this case are just strings
var appendEvent = function (state, action) {
    return sessionReducerHelper(state, action, function (currentSession, given_action) {
        return __assign(__assign({}, currentSession), { eventLog: __spreadArrays(currentSession.eventLog, [given_action.payload.event]) });
    });
};
var setAuthToken = function (state, action) {
    state.authToken = action.payload.authToken;
    return state;
};
var setPusherState = function (state, action) {
    return sessionReducerHelper(function (state, action) {
        return __assign(__assign({}, state), { authToken: action.payload.authToken });
    });
};
var setChannelTypeInput = function (state, action) {
    state.channelTypeInput = action.payload.channelTypeInput;
    return state;
};
function pusherClientRootReducer(state, action) {
    if (state === void 0) { state = initState; }
    if (action.type in reducerHandlers) {
        return reducerHandlers[action.type](state, action);
    }
    else {
        console.debug("Error: Attempted to dispatch an action that doesn't exist: " + action.type + ".");
        return state;
    }
}
export var reducerHandlers = (_a = {},
    _a[action_types.setAuthToken] = setAuthToken,
    _a[action_types.fetchAppKey] = fetchAppKey,
    _a[action_types.fetchStaffId] = setStaffId,
    _a[action_types.fetchProjTempVerId] = setProjTempVerId,
    _a[action_types.loadSessionToken] = setCurrentSessionToken,
    _a[action_types.setFocusId] = setFocusId,
    _a[action_types.appendEvent] = appendEvent,
    _a[action_types.setPusherState] = setPusherState,
    _a[action_types.setMakeChannelInput] = setMakeChannelInput,
    _a[action_types.setConnectChannelInput] = setConnectChannelInput,
    _a[action_types.setChannelTypeInput] = setChannelTypeInput,
    _a[action_types.sPromptsCToQuit] = '',
    _a[action_types.sRelaysCanKickOutOtherC] = '',
    _a[action_types.cGetsRejectionToEdit] = '',
    _a[action_types.cRequestsToKickOutC] = '',
    _a);
var options = { realtime: true, port: 7001, hostname: "pushertest.local", trace: true };
var composeEnhancers = composeWithDevTools(options);
export var sagaMiddleware = createSagaMiddleware();
export var rootReducer = combineReducers({ pusherClientRootReducer: pusherClientRootReducer });
export var store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
// A subscription is a listener that will change the DOM when a change in state is triggered.
