import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { authReducer } from './auth';
import createPersistReducer from 'redux/reducers/persist';

const createRootReducer = (history: History) => {
  const reducers = combineReducers({
    auth: authReducer,
    router: connectRouter(history),
  });
  return createPersistReducer(reducers);
};

export default createRootReducer;
