// Call normal functions (functions that are not generators)
// Put JS objects into reducer. Executed by the end of next line, not necessarily immediate.
// Fork a new tree of generators that can be executed in parallel.
// Take a break until an action has been received by the store, capture and return that action object.
// Select a function that take a store and returns a slice, and call it on the current store.

const effects = ReduxSaga.effects;

function* fetchStaffId()
{
    yield call(fetchJSONOrGetNull,'/fetchStaffId');
}

function* storeSessionTokenInSessionStorage()
{

}

function* serverPromptsClientToQuit()
{
    let d;
}

function* serverSendsCanKickOutOtherClient()
{
    let d;
}

function* serverSendsRejectionToEdit(){
    let d;
}

function* clientRequestsToKickOut() {
    let d = 4;
}

function* initPusherClient() {
    // Enable pusher logging - don't include this in production
    const pusher = yield effects.call( function() {
        debugger;
        Pusher.logToConsole = true;
        return new Pusher('12398ade8605b8b69e1e', {
            cluster: 'us2'
        });
    });

    yield effects.put({type: versionEditingActionTypes.SetPusher, pusherObj: pusher});

    const channel = yield effects.call(function(pusherObj){
        pusherObj.subscribe('my-channel');
    }, pusher)

    yield effects.call(function(channelObj){
        channelObj.bind('my-event', function(data) {
            alert(JSON.stringify(data));
        });
    }, channel);

    yield effects.put({type: versionEditingActionTypes.SetChannel, channelObj: channel});
}

let projectTemplateVersionEditingSaga = [
    initPusherClient
]

function* rootSaga() {
    yield effects.all(projectTemplateVersionEditingSaga)
}