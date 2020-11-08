import {
    fetchJSONOrGetNull,
    getSessionStorageKeyName,
    ChannelTypePrefix,
    getChannelName,
    getChannelTypePrefix
} from "./pusher_client/helpers";
import {sagaMiddleware, store} from "./pusher_client/reducers";
import {connectToChannel, initPusherClient} from "./pusher_client/sagas";
import "core-js/stable";
import "regenerator-runtime/runtime";
import {action_creators} from "./pusher_client/actions";

import BSN from "bootstrap.native";

//Initialize DOM
function addListeners() {

    //Add OnBlur to Text Box
    document.querySelector("#authToken").addEventListener('blur', function() {
        const token = document.querySelector("#authToken").value;
        store.dispatch(action_creators.setAuthToken(token))
    });

    document.querySelector("#makeChannelInput").addEventListener('blur', function() {
        const input = document.querySelector("#makeChannelInput").value;
        store.dispatch(action_creators.setMakeChannelInput(input))
    });

    document.querySelector("#connectChannelInput").addEventListener('blur', function() {
        const input = document.querySelector("#connectChannelInput").value;
        store.dispatch(action_creators.setConnectChannelInput(input))
    });


    //Initialize Button
    document.querySelector('#initializePusher').addEventListener('click', function () {
        sagaMiddleware.run(initPusherClient)


    })

    //Send a message
    document.querySelector('#generateTestEvent').addEventListener('click', function () {
        const channelForMessage = getConnectionObject().connectChannelInput;
        fetchJSONOrGetNull('/generateTestEvent', {}, true,
            JSON.stringify({"channel": channelForMessage, "event": "event"}), true).then((response) => {
            console.info("Sent Message successfully")
        }).catch(function (e) {
            console.error("Did not send message successfully");
        });
    })

    //Get Staff Id
    document.querySelector('#getStaffId').addEventListener('click', function (response) {
        fetchJSONOrGetNull('/fetchStaffId').then(function (response) {

            store.dispatch(action_creators.fetchStaffId(response["staffid"]))
            console.info("Successfully communicated with database")
        }).catch(function (e) {
            console.debug("Did not successfully communicate with database")
        })
    })

    document.querySelectorAll('#channelDropdown a').forEach(function (selector) {
        selector.addEventListener('click', function (event) {
            const choice = event.currentTarget.dataset.value;
            const text = event.currentTarget.textContent;

            document.querySelector('#dropdownMenuButton').textContent = text;

            // Public - 1, Private - 2, Presence - 3, Encrypted - 4
            document.querySelector('#dropdownMenuButton').dataset.value = choice;

            const input = getChannelTypePrefix(choice);
            store.dispatch(action_creators.setChannelTypeInput(input));

        })
    })

    document.querySelector('#makeChannelInputButton').addEventListener('click', function () {
        const connectionObject = getConnectionObject();

        fetch('/pusher/create', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(connectionObject)
        })
            .then(response => response.json().then(json => alert(JSON.stringify(json))));

    })

    document.querySelector('#connectChannelInputButton').addEventListener('click', function () {
        const connectionObject = getConnectionObject();

        if (getConnectionObject().connectChannelInput != null )
        {
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
    })
}

export function getConnectionObject() {
    const channelName = document.querySelector('#connectChannelInput').value;
    const authToken = document.querySelector('#authToken').value;
    const channelValue = document.querySelector('#dropdownMenuButton').dataset.value;
    const connectChannelInput = document.querySelector("#connectChannelInput").value;
    const makeChannelInput = document.querySelector("#makeChannelInput").value;

    const channelTypeInput = getChannelTypePrefix(channelValue);

    return {
        channelName: channelName,
        authToken: authToken,
        channelTypeInput: channelTypeInput,
        connectChannelInput: connectChannelInput,
        makeChannelInput: makeChannelInput
    }
}

//Effects of Actions, These Functions are Called when Store is updated
function render() {
    const currentState = store.getState().pusherClientRootReducer

    if (currentState?.currentProjectVersionId === -1 || currentState?.sessions == null) {
        return;
    }

    let possibleSessions = currentState.sessions.filter(function (session) {
        return session.projTempVerId === currentState.currentProjectVersionId;
    })

    const currentSession = possibleSessions?.slice(-1)[0];

    if (currentSession == null) {
        console.debug('Why is current session null? Exiting render()')
        return;
    }

    document.querySelector("#output").innerHTML = "";
    currentSession?.eventLog.map(line => {
        document.querySelector('#output').innerHTML += `<li>${line}</li>`
    })

    if (currentSession.sessionStorageToken !== -1) {
        document.querySelector("#sessionToken").textContent = currentSession.sessionStorageToken;
        sessionStorage.setItem(getSessionStorageKeyName(currentSession.projTempVerId), currentSession.sessionStorageToken);
    }

}

function sPromptsCToQuitListener() {
    const currentState = store.getState().pusherClientRootReducer;
}

// Initialize Application
addListeners();
store.subscribe(render);
store.subscribe(sPromptsCToQuitListener);
