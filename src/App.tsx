import React, { FC } from "react";
import "./App.less";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { Provider } from "react-redux";
import store from "store";

const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

export default App;
