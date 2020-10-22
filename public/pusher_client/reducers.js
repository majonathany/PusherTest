const initialProjectTemplateVersionClientState = {
    currentProjectVersionId: -1,
    sessions: [{
        pusher: null,
        channel: null,
        staffId: fetchStaffId(),
        projectVersionId: 1,
        sessionStorageToken: uuidv4(),
        canEdit: false,
        isEditing: false,
        eventLog: []
    }]
}

function versionEditingReducer(state, action) {
    state = state || initialProjectTemplateVersionClientState;

    let possibleSessions = state.sessions.filter(function (clientState) {
        return clientState.projectVersionId === action.projectVersionId
    })


    let currentSession = possibleSessions.slice(-1)[0] || initialProjectTemplateVersionClientState;


    switch (action.type) {
        case versionEditingActionTypes.FetchStaffId:
            break;
        case versionEditingActionTypes.SetPusher:
            currentSession.pusher = action.pusherObj;
            break;
        case versionEditingActionTypes.SetChannel:
            currentSession.channel = action.channelObj;
            break;
        default:
            return state
    }

    return {
        currentProjectVersionId: state.currentProjectVersionId,
        sessions: [...state.sessions.filter(function (clientSession) {
            return clientSession.projectVersionId !== action.projectVersionId
        }), currentSession]
    }

}

let rootReducer = Redux.combineReducers({versionEditingReducer});
