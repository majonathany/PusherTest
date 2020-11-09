import {screamifyCamel} from "./helpers";
//versionEditingActions - define a (args) => {type: '', ...args}

// To add new action: add an action here, add a reducer function in reducers.js, and add to the render()
// function in main.js, or subscribe another function.

// Describes possible actions that could change state
export enum action_types {
	setPusherState = "setPusherState",
	setAppKey = "setAppKey",
	setAuthToken = "setAuthToken",
	setMakeChannelInput = "setMakeChannelInput",
	setConnectChannelInput = "setConnectChannelInput",
	setChannelTypeInput = "setChannelTypeInput",
	appendEvent = "appendEvent",
	cRequestsToKickOutC = "cRequestsToKickOutC",
	fetchProjTempVerId = "fetchProjTempVerId",
	fetchStaffId = "fetchStaffId",
	fetchAppKey = "fetchAppKey",
	loadSessionToken = "loadSessionToken",
	setFocusId = "setFocusId",
	sPromptsCToQuit = "sPromptsCToQuit",
	sRelaysCanKickOutOtherC = "sRelaysCanKickOutOtherC",
}



//Describes possible state changes

// Describes the anatomy of the actions/events that need to be processed by the reducers
export const action_creators = {
	setPusherState: pusher_state  => ({type: action_types.setPusherState, payload: {pusher_state: pusher_state}}),
	setAuthToken: token => ({type: action_types.setAuthToken, payload: {authToken: token}}),
	appendEvent: event => ({type: action_types.appendEvent, payload: {event: event}}),
	setMakeChannelInput: input => ({type: action_types.setMakeChannelInput, payload: {makeChannelInput: input}}),
	setConnectChannelInput: input => ({type: action_types.setConnectChannelInput, payload: {connectChannelInput: input}}),
	setChannelTypeInput: input => ({type: action_types.setChannelTypeInput, payload: {channelTypeInput: input}}),
	cGetsRejectionToEdit: ['payload'],
	cRequestsToKickOutC: ['payload'],
	setProjTempVerId: id => ({type: action_types.fetchProjTempVerId, payload: {id: id}}),
	fetchStaffId: staffId => ({type: action_types.fetchStaffId, payload: {staffId: staffId}}),
	fetchAppKey: appKey => ({type: action_types.fetchAppKey, payload: {appKey: appKey}}),
	loadSessionToken: () => ({type: action_types.loadSessionToken}),
	setFocusId: id => ({type: action_types.setFocusId, payload: {id: id}}),
	sPromptsCToQuit: ['payload'],
	sRelaysCanKickOutOtherC: ['payload']
}

