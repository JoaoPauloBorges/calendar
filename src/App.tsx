import React, { FC } from "react";
import "./App.less";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { Provider } from "react-redux";
import store from "store";
import Layout from "components/Layout";

const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
