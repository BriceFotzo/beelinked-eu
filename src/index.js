import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './Alertes/src/reducers';
import rootSaga from './Alertes/src/sagas';
import './Alertes/src/css/index.css';


//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SelectRucher from './SelectRucher/SelectRucher';
import PasserApiculteur from './PasserApiculteur/passerApiculteur';
import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
     <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
