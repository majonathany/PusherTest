import {getSessionStorageKeyName, uuidv4} from "./helpers";
import {action_types} from './actions';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'

// initialProjectTemplateVersionClientState
// This is the state for the current user. There is a difference between the current project the user
// is editing, and his open sessions.
const initState = {
    currentProjectVersionId: -1,
    sessions: [{
        staffId: -1,
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
        currentProjectVersionId: state.currentProjectVersionId,
        sessions: [...state.sessions.filter(function (clientSession) {
            return clientSession.projTempVerId !== state.currentProjectVersionId
        }), currentSession]
    }
}


const fetchStaffIdReducer = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession, given_action) => {
        currentSession.staffId = given_action.staff_id;
        return currentSession
    })
}

const fetchProjTempVerIdReducer = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession, given_action) => {
        currentSession.projTempVerId = given_action.version_id;
        return currentSession;
    })
}

const loadSessionTokenReducer = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession) => {


        if (currentSession.projTempVerId === -1) {
            console.debug('Cannot set session token when projTempVerId is null')
        }
        else {
            const sessionStorageKeyName = getSessionStorageKeyName(currentSession.projTempVerId);
            currentSession.sessionStorageToken = sessionStorage.getItem(sessionStorageKeyName) || uuidv4();
        }

        return currentSession;
    })
}

// Sets current Project Template Version ID
const setFocusId = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession) => {
        state.currentProjectVersionId = action.id;
        return currentSession;
    })
}

// Sets the current session token.
const setCurrentSessionToken = (state, action) => {
    return sessionReducerHelper(state, action, (currentSession) => {
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

// Events in this case are just strings
const appendEvent = (state, action) => {
    return sessionReducerHelper(state, action, currentSession => {
        return {...currentSession, eventLog: [...currentSession.eventLog, action.event.message]};
    })
}

export const reducerHandlers = {
    [action_types.fetchStaffId]: fetchStaffIdReducer,
    [action_types.fetchProjTempVerId]: fetchProjTempVerIdReducer,
    [action_types.loadSessionToken]: loadSessionTokenReducer,
    [action_types.setFocusId]: setFocusId,
    [action_types.appendEvent]: appendEvent,
    [action_types.sPromptsCToQuit]: '',
    [action_types.sRelaysCanKickOutOtherC]: '',
    [action_types.cGetsRejectionToEdit]: '',
    [action_types.cRequestsToKickOutC]: ''

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

export const sagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers({pusherClientRootReducer});
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// A subscription is a listener that will change the DOM when a change in state is triggered.

