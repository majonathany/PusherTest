import {fetchJSONOrGetNull} from "./helpers";
import {sagaMiddleware, store} from "./reducers";
import {initPusherClient} from "./sagas";
import "core-js/stable";
import "regenerator-runtime/runtime";

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
}


// Initialize Application
addListeners();
store.subscribe(render);
