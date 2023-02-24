import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Service/Reducer/index';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
     document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
