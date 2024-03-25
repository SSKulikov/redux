import {
    combineReducers,
    compose,
    legacy_createStore
  } from "redux";
  
  import notesReducer from './notesReducer';
  
  const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  
  function configureStorage() {
    return legacy_createStore(
      combineReducers({
        notes: notesReducer,
      }),
      undefined,
      compose(
        ReactReduxDevTools,
      )
    );
  }
  
  export default configureStorage;
  