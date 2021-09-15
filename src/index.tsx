import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from 'redux/configureStore';
import TagManager, { TagManagerArgs } from 'react-gtm-module';

import { rootSaga } from 'redux/sagas';
import 'i18n';
import 'index.css';
import 'asset/css/line-awesome.min.css';
import App from 'App';
import * as serviceWorker from './serviceWorker';
import sagaMiddleware from 'redux/middlewares/saga';
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'

const tagManagerArgs: TagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID as string,
};

TagManager.initialize(tagManagerArgs);

const initialState = {};
const store = configureStore(initialState);
// const persistor = persistStore(store)

//Initial Redux Saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      {
        //<PersistGate loading={null} persistor={persistor}>
      }
      <App history={history} />
      {
        //</PersistGate>
      }
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
