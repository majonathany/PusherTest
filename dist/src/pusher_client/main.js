import { fetchJSONOrGetNull, getSessionStorageKeyName, getChannelTypePrefix } from "./helpers";
import { sagaMiddleware, store } from "./reducers";
import { connectToChannel, initPusherClient } from "./sagas";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { action_creators } from "./actions";
//Initialize DOM
function addListeners() {
    //Add OnBlur to Text Box
    document.querySelector("#authToken").addEventListener('blur', function () {
        var token = document.querySelector("#authToken").value;
        store.dispatch(action_creators.setAuthToken(token));
    });
    document.querySelector("#makeChannelInput").addEventListener('blur', function () {
        var input = document.querySelector("#makeChannelInput").value;
        store.dispatch(action_creators.setMakeChannelInput(input));
    });
    document.querySelector("#connectChannelInput").addEventListener('blur', function () {
        var input = document.querySelector("#connectChannelInput").value;
        store.dispatch(action_creators.setConnectChannelInput(input));
    });
    //Initialize Button
    document.querySelector('#initializePusher').addEventListener('click', function () {
        sagaMiddleware.run(initPusherClient);
    });
    //Send a message
    document.querySelector('#generateTestEvent').addEventListener('click', function () {
        var channelForMessage = getConnectionObject().connectChannelInput;
        fetchJSONOrGetNull('/generateTestEvent', {}, true, JSON.stringify({ "channel": channelForMessage, "event": "event" }), true).then(function (response) {
            console.info("Sent Message successfully");
        }).catch(function (e) {
            console.error("Did not send message successfully");
        });
    });
    //Get Staff Id
    document.querySelector('#getStaffId').addEventListener('click', function (response) {
        fetchJSONOrGetNull('/fetchStaffId').then(function (response) {
            store.dispatch(action_creators.fetchStaffId(response["staffid"]));
            console.info("Successfully communicated with database");
        }).catch(function (e) {
            console.debug("Did not successfully communicate with database");
        });
    });
    document.querySelectorAll('#channelDropdown a').forEach(function (selector) {
        selector.addEventListener('click', function (event) {
            var choice = event.currentTarget.dataset.value;
            var text = event.currentTarget.textContent;
            document.querySelector('#dropdownMenuButton').textContent = text;
            // Public - 1, Private - 2, Presence - 3, Encrypted - 4
            document.querySelector('#dropdownMenuButton').dataset.value = choice;
            var input = getChannelTypePrefix(choice);
            store.dispatch(action_creators.setChannelTypeInput(input));
        });
    });
    document.querySelector('#makeChannelInputButton').addEventListener('click', function () {
        var connectionObject = getConnectionObject();
        fetch('/pusher/create', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(connectionObject)
        })
            .then(function (response) { return response.json().then(function (json) { return alert(JSON.stringify(json)); }); });
    });
    document.querySelector('#connectChannelInputButton').addEventListener('click', function () {
        var connectionObject = getConnectionObject();
        if (getConnectionObject().connectChannelInput != null) {
            if (confirm("LoadedPusher. Connect to channel: " + getConnectionObject().connectChannelInput + "?")) {
                sagaMiddleware.run(connectToChannel);
            }
        }
        // fetch('/pusher/connect', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(connectionObject)
        // }).then(response => response.json()
        //     .then(json => alert(JSON.stringify(json)))
        // ).catch(e => {
        //     console.error("Could not get response back from server for connection.");
        //     alert(e);
        // });
    });
}
export function getConnectionObject() {
    var channelName = document.querySelector('#connectChannelInput').value;
    var authToken = document.querySelector('#authToken').value;
    var channelValue = document.querySelector('#dropdownMenuButton').dataset.value;
    var connectChannelInput = document.querySelector("#connectChannelInput").value;
    var makeChannelInput = document.querySelector("#makeChannelInput").value;
    var channelTypeInput = getChannelTypePrefix(channelValue);
    return {
        channelName: channelName,
        authToken: authToken,
        channelTypeInput: channelTypeInput,
        connectChannelInput: connectChannelInput,
        makeChannelInput: makeChannelInput
    };
}
//Effects of Actions, These Functions are Called when Store is updated
function render() {
    var currentState = store.getState().pusherClientRootReducer;
    if ((currentState === null || currentState === void 0 ? void 0 : currentState.currentProjectVersionId) === -1 || (currentState === null || currentState === void 0 ? void 0 : currentState.sessions) == null) {
        return;
    }
    var possibleSessions = currentState.sessions.filter(function (session) {
        return session.projTempVerId === currentState.currentProjectVersionId;
    });
    var currentSession = possibleSessions === null || possibleSessions === void 0 ? void 0 : possibleSessions.slice(-1)[0];
    if (currentSession == null) {
        console.debug('Why is current session null? Exiting render()');
        return;
    }
    document.querySelector("#output").innerHTML = "";
    currentSession === null || currentSession === void 0 ? void 0 : currentSession.eventLog.map(function (line) {
        document.querySelector('#output').innerHTML += "<li>" + line + "</li>";
    });
    if (currentSession.sessionStorageToken !== -1) {
        document.querySelector("#sessionToken").textContent = currentSession.sessionStorageToken;
        sessionStorage.setItem(getSessionStorageKeyName(currentSession.projTempVerId), currentSession.sessionStorageToken);
    }
}
function sPromptsCToQuitListener() {
    var currentState = store.getState().pusherClientRootReducer;
}
// Initialize Application
addListeners();
store.subscribe(render);
store.subscribe(sPromptsCToQuitListener);
