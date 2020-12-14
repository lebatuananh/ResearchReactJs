import { createStore, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
//const middlewares = [thunk, sagaMiddleware];

// const bindMiddleware = middleware => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension');
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

//const store = createStore(rootReducer, bindMiddleware(middlewares));

//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const composeSetup =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const store = createStore(rootReducer, composeSetup(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
export { store };
