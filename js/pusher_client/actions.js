import {screamifyCamel} from "./helpers";
//versionEditingActions - define a (args) => {type: '', ...args}

// Describes possible actions that could change state
export const action_types = {
	fetchStaffId: "fetchStaffId",
	fetchProjTempVerId: "fetchProjTempVerId",
	loadSessionToken: "loadSessionToken",
	setFocusId: "setFocusId",
	appendEvent: "appendEvent",
	sPromptsCToQuit: "sPromptsCToQuit",
	sRelaysCanKickOutOtherC: "sRelaysCanKickOutOtherC",
	cRequestsToKickOutC: "cRequestsToKickOutC"
}



//Describes possible state changes

// Describes the anatomy of the actions/events that need to be processed by the reducers
export const action_creators = {
	fetchStaffId: staff_id => ({type: action_types.fetchStaffId, staff_id: staff_id}),
	fetchProjTempVerId: id => ({type: action_types.fetchProjTempVerId, id: id}),
	loadSessionToken: () => ({type: action_types.loadSessionToken}),
	setFocusId: id => ({type: action_types.setFocusId, id: id}),
	appendEvent: event => ({type: action_types.appendEvent, event: event}),
	sPromptsCToQuit: ['payload'],
	sRelaysCanKickOutOtherC: ['payload'],
	cGetsRejectionToEdit: ['payload'],
	cRequestsToKickOutC: ['payload']
}

