import {ChannelTypePrefix, getSessionStorageKeyName, uuidv4} from "./helpers";
import {action_types} from './actions';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import devToolsEnhancer, {composeWithDevTools} from 'remote-redux-devtools';

// initialProjectTemplateVersionClientState
// This is the state for the current user. There is a difference between the current project the user
// is editing, and his open sessions.

interface PusherClientState {
    channelTypeInput: ChannelTypePrefix
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
}

const initState = {
    channelTypeInput: ChannelTypePrefix.PUBLIC,
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
}



// Takes a reducer function, extracts the session of interest, performs the reduction, and returns the correct store.
const sessionReducerHelper = (state, action, reducer) => {
    let possibleSessions = state.sessions.filter(function (session) {
        return session.projTempVerId === state.currentProjectVersionId
    })

    let currentSession = possibleSessions.slice(-1)[0] || initState.sessions[0];
    currentSession = reducer(currentSession, action);

    return {
        ...state,
        sessions: [...state.sessions.filter(function (clientSession) {
            return clientSession.projTempVerId !== state.currentProjectVersionId
        }), currentSession]
    }
}


const setStaffId = (state, action) => {

    state.staffId = action.payload.staffId;
    return state;
}

const setProjTempVerId = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession, given_action) => {
        currentSession.projTempVerId = given_action.payload.id;
        return currentSession;
    })
}

const fetchAppKey = (state, action) => {
    state.appKey = action.payload.appKey;
    return state;
}


// Sets current Project Template Version ID
const setFocusId = (state, action) => {
    state.currentProjectVersionId = action.payload.id;
    return state;
}

// Sets the current session token.
const setCurrentSessionToken = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession, given_action) => {
        if (currentSession.projTempVerId === -1) {
            console.debug('Cannot set session token when projTempVerId is null')
        }
        else {
            const sessionStorageKey = `projTempVer-${currentSession.projTempVerId}-SessionToken`;
            currentSession.sessionStorageToken = sessionStorage.getItem(sessionStorageKey) || uuidv4();
        }
        return currentSession;
    })
}

const setMakeChannelInput = (state, action) => {
    state.makeChannelInput = action.payload.makeChannelInput;
    return state;
}

const setConnectChannelInput = (state, action) => {
    state.connectChannelInput = action.payload.connectChannelInput;
    return state;
}

// Events in this case are just strings
const appendEvent = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession, given_action) => {
        return {...currentSession, eventLog: [...currentSession.eventLog, given_action.payload.event]};
    })
}

const setAuthToken = (state, action) => {
    state.authToken = action.payload.authToken;
    return state;
}

const setPusherState = (state, action) => {
    return sessionReducerHelper((state, action) => {
        return {...state, authToken: action.payload.authToken }
    })
}

const setChannelTypeInput = (state, action) => {
    state.channelTypeInput = action.payload.channelTypeInput;
    return state;
}


function pusherClientRootReducer(state = initState, action) {
    if (action.type in reducerHandlers) {
        return reducerHandlers[action.type](state, action)
    }
    else {
        console.debug(`Error: Attempted to dispatch an action that doesn't exist: ${action.type}.`);
        return state;
    }
}

export const reducerHandlers = {
    [action_types.setAuthToken]: setAuthToken,
    [action_types.fetchAppKey]: fetchAppKey,
    [action_types.fetchStaffId]: setStaffId,
    [action_types.fetchProjTempVerId]: setProjTempVerId,
    [action_types.loadSessionToken]: setCurrentSessionToken,
    [action_types.setFocusId]: setFocusId,
    [action_types.appendEvent]: appendEvent,
    [action_types.setPusherState]: setPusherState,
    [action_types.setMakeChannelInput]: setMakeChannelInput,
    [action_types.setConnectChannelInput]: setConnectChannelInput,
    [action_types.setChannelTypeInput]: setChannelTypeInput,
    [action_types.sPromptsCToQuit]: '',
    [action_types.sRelaysCanKickOutOtherC]: '',
    [action_types.cGetsRejectionToEdit]: '',
    [action_types.cRequestsToKickOutC]: ''
}


const options = { realtime: true, port: 7001, hostname: "pushertest.local", trace: true }
const composeEnhancers = composeWithDevTools(options);

export const sagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers({pusherClientRootReducer});
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

// A subscription is a listener that will change the DOM when a change in state is triggered.

