import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import reducers from './reducers';
import { ADD_RECIPE } from './action-types';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
export const history = createBrowserHistory();
const router = routerMiddleware(history);

const composeEnhancers =
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
    
const enhancers = composeEnhancers(applyMiddleware(thunk, router))

const store = createStore(
  connectRouter(history)(reducers),
  {},
  enhancers
);

store.dispatch({
  type: ADD_RECIPE,
  payload: {
    name: 'Omlette',
    source: 'random website',
    ingredients: [
      { name: 'Eggs', quantity: '3', unit: 'pcs', id: 1 },
      { name: 'Salt', quantity: '10', unit: 'gr', id: 2 }
    ],
    preparation_time: {
      hours: 0,
      minutes: 15
    },
    instructions: 'Pay someone else to make your Omlette!',
  }
})

export default store;
