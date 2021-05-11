import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import formFields from "./Form/Form-Reducer";
import formSaga from "./Form/Form-Operation";
import Form from "./Form/Form";

const allReducers = {
    formFields: formFields
};

const rootReducer = combineReducers(allReducers);

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(formSaga);

window.store = store;

function App() {
  return (
      <Provider store={store}>
        <Form />
      </Provider>
  );
}

export default App;
