//versionEditingActions - define a (args) => {type: '', ...args}

const versionEditingActions = {
	fetchStaffId: function() {
		return {type: versionEditingActionTypes.FetchStaffId};
	},
	setPusher: function(pusherObj) {
		return {type: versionEditingActionTypes.SetPusher, pusherObj: pusherObj};
	},
	setChannel: function(channelObj) {
		return {type: versionEditingActionTypes.SetPusher, channelObj: channelObj};
	},
	storeTokenInSessionStorage: function(token) {
		return {type: versionEditingActionTypes.StoreTokenInSessionStorage, token: token}
	},
	sPromptsCToQuit: function(payload) {
		return {type: versionEditingActionTypes.SPromptsCToQuit, payload: payload}
	},
	sRelaysCanKickOutOtherC: function(payload) {
		return {type: versionEditingActionTypes.SRelaysCanKickOutOtherC, payload: payload}
	},
	CGetsRejectionToEdit: function(payload) {
		return {type: versionEditingActionTypes.CGetsRejectionToEdit, payload: payload}
	},
	cRequestsToKickOutC: function(payload) {
		return {type: versionEditingActionTypes.CRequestsToKickOutC, payload: payload}
	},
}