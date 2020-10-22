//Initialize DOM
function addListeners()
{
	document.querySelector('#initializePusher').addEventListener('click', function(){
		sagaMiddleware.run(initPusherClient)
	})

	document.querySelector('#generateTestEvent').addEventListener('click', async function(){
		document.querySelector('#output').textContent = JSON.stringify(await fetchJSONOrGetNull('/generateTestEvent') || "Nothing");
	})

	document.querySelector('#makeEntry').addEventListener('click', async function(){
		let response = await fetchJSONOrGetNull('/fetchStaffId');
		document.querySelector('#output').textContent = response ? JSON.stringify(response) : "Nothing";
	})
}

//Effects of Actions, These Functions are Called when Store is updated
function render() {
}


// Initialize Application
addListeners();

const createSagaMiddleware = ReduxSaga.default;
const sagaMiddleware = createSagaMiddleware();
var store = Redux.createStore(rootReducer, Redux.applyMiddleware(sagaMiddleware));

// A subscription is a listener that will change the DOM when a change in state is triggered.
store.subscribe(render);