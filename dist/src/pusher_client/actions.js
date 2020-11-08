//versionEditingActions - define a (args) => {type: '', ...args}
// To add new action: add an action here, add a reducer function in reducers.js, and add to the render()
// function in main.js, or subscribe another function.
// Describes possible actions that could change state
export var action_types = {
    setPusherState: "setPusherState",
    setAppKey: "setAppKey",
    setAuthToken: "setAuthToken",
    setMakeChannelInput: "setMakeChannelInput",
    setConnectChannelInput: "setConnectChannelInput",
    setChannelTypeInput: "setChannelTypeInput",
    appendEvent: "appendEvent",
    cRequestsToKickOutC: "cRequestsToKickOutC",
    fetchProjTempVerId: "fetchProjTempVerId",
    fetchStaffId: "fetchStaffId",
    fetchAppKey: "fetchAppKey",
    loadSessionToken: "loadSessionToken",
    setFocusId: "setFocusId",
    sPromptsCToQuit: "sPromptsCToQuit",
    sRelaysCanKickOutOtherC: "sRelaysCanKickOutOtherC",
};
//Describes possible state changes
// Describes the anatomy of the actions/events that need to be processed by the reducers
export var action_creators = {
    setPusherState: function (pusher_state) { return ({ type: action_types.setPusherState, payload: { pusher_state: pusher_state } }); },
    setAuthToken: function (token) { return ({ type: action_types.setAuthToken, payload: { authToken: token } }); },
    appendEvent: function (event) { return ({ type: action_types.appendEvent, payload: { event: event } }); },
    setMakeChannelInput: function (input) { return ({ type: action_types.setMakeChannelInput, payload: { makeChannelInput: input } }); },
    setConnectChannelInput: function (input) { return ({ type: action_types.setConnectChannelInput, payload: { connectChannelInput: input } }); },
    setChannelTypeInput: function (input) { return ({ type: action_types.setChannelTypeInput, payload: { channelTypeInput: input } }); },
    cGetsRejectionToEdit: ['payload'],
    cRequestsToKickOutC: ['payload'],
    setProjTempVerId: function (id) { return ({ type: action_types.fetchProjTempVerId, payload: { id: id } }); },
    fetchStaffId: function (staffId) { return ({ type: action_types.fetchStaffId, payload: { staffId: staffId } }); },
    fetchAppKey: function (appKey) { return ({ type: action_types.fetchAppKey, payload: { appKey: appKey } }); },
    loadSessionToken: function () { return ({ type: action_types.loadSessionToken }); },
    setFocusId: function (id) { return ({ type: action_types.setFocusId, payload: { id: id } }); },
    sPromptsCToQuit: ['payload'],
    sRelaysCanKickOutOtherC: ['payload']
};
