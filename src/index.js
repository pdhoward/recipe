import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import reducer from './reducers'

// passes in a function which says if the extension for redux is present on the window
// object, then invoke it
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
