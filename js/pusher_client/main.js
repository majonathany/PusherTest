import {fetchJSONOrGetNull, getSessionStorageKeyName} from "./helpers";
import {sagaMiddleware, store} from "./reducers";
import {initPusherClient} from "./sagas";
import "core-js/stable";
import "regenerator-runtime/runtime";

import BSN from "bootstrap.native";


//Initialize DOM
function addListeners()
{
	document.querySelector('#initializePusher').addEventListener('click', function(){
		sagaMiddleware.run(initPusherClient)
	})

	document.querySelector('#generateTestEvent').addEventListener('click', function(){
		fetchJSONOrGetNull('/generateTestEvent').then((response) => {
			console.info("Sent Message succesfully")
		}).catch(function(e){
			console.error(  "Did not send message successfully");
		});
	})

	document.querySelector('#makeEntry').addEventListener('click', function(response){
		fetchJSONOrGetNull('/fetchStaffId').then(function(response) {
			console.info("Successfully communicated with database")
		}).catch(function(e) {
			console.debug("Did not successfully communicate with database")
		})
	})

	document.querySelectorAll('#channelDropdown a').forEach(function(selector) {
		selector.addEventListener('click', function(event){
			document.querySelector('#dropdownMenuButton').textContent = event.currentTarget.textContent;

			// Public - 1, Private - 2, Presence - 3, Encrypted - 4
			document.querySelector('#dropdownMenuButton').dataset.value = event.currentTarget.dataset.value;
		})
	})

	document.querySelector('#makeNewChannel').addEventListener('click', function() {
		const channelName = document.querySelector('#createChannelName').value;
		const authToken = document.querySelector('#authToken').value;

		fetch('/pusher/create', { method: "POST",
			headers: {'Accept': 'application/json',
				'Content-Type': 'application/json'},
			body: JSON.stringify({'authToken': 'hello'})})
			.then(response => response.json().then(json => alert(JSON.stringify(json))));

	})

	document.querySelector('#connectToChannel').addEventListener('click', function() {
		const channelName = document.querySelector('#connectToChannelName').value;
		const authToken = document.querySelector('#authToken').value;



		fetch('/pusher/connect', {method: 'POST',
			headers: {'Accept': 'application/json',
				'Content-Type': 'application/json'},
				body: JSON.stringify({authToken: 'hello'})})
			.then(response => response.json().then(json => alert(JSON.stringify(json))));

	})

}

//Effects of Actions, These Functions are Called when Store is updated
function render() {
	const currentState = store.getState().pusherClientRootReducer

	if (currentState?.currentProjectVersionId === -1 || currentState?.sessions == null) {
		console.debug('Info: Redux store has been updated, but pusher is not ready.')
		return;
	}

	let possibleSessions = currentState.sessions.filter(function (session) {
		return session.projTempVerId === currentState.currentProjectVersionId;
	})

	const currentSession = possibleSessions?.slice(-1)[0];

	if (currentSession == null)
	{
		console.debug('Why is current session null?')
		return;
	}

	document.querySelector("#output").innerHTML = "";
	currentSession?.eventLog.map(line => {
		document.querySelector('#output').innerHTML += `<li>${line}</li>`
	})

	if (currentSession.sessionStorageToken !== -1)
	{
		document.querySelector("#sessionToken").textContent = currentSession.sessionStorageToken;
		sessionStorage.setItem(getSessionStorageKeyName(currentSession.projTempVerId), currentSession.sessionStorageToken);
	}

}

function sPromptsCToQuitListener()
{
	const currentState = store.getState().pusherClientRootReducer;

}

// Initialize Application
addListeners();
store.subscribe(render);
store.subscribe(sPromptsCToQuitListener);
