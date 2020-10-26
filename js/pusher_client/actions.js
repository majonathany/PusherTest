import {screamifyCamel} from "./helpers";
//versionEditingActions - define a (args) => {type: '', ...args}

// To add new action: add an action here, add a reducer function in reducers.js, and add to the render()
// function in main.js, or subscribe another function.

// Describes possible actions that could change state
export const action_types = {
	appendEvent: "appendEvent",
	cRequestsToKickOutC: "cRequestsToKickOutC",
	fetchProjTempVerId: "fetchProjTempVerId",
	fetchStaffId: "fetchStaffId",
	loadSessionToken: "loadSessionToken",
	setFocusId: "setFocusId",
	sPromptsCToQuit: "sPromptsCToQuit",
	sRelaysCanKickOutOtherC: "sRelaysCanKickOutOtherC",
}



//Describes possible state changes

// Describes the anatomy of the actions/events that need to be processed by the reducers
export const action_creators = {
	appendEvent: event => ({type: action_types.appendEvent, event: event}),
	cGetsRejectionToEdit: ['payload'],
	cRequestsToKickOutC: ['payload'],
	fetchProjTempVerId: id => ({type: action_types.fetchProjTempVerId, id: id}),
	fetchStaffId: staff_id => ({type: action_types.fetchStaffId, staff_id: staff_id}),
	loadSessionToken: () => ({type: action_types.loadSessionToken}),
	setFocusId: id => ({type: action_types.setFocusId, id: id}),
	sPromptsCToQuit: ['payload'],
	sRelaysCanKickOutOtherC: ['payload']
}

