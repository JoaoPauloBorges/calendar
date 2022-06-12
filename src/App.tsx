import React, { FC } from "react";
import "./App.less";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { Provider } from "react-redux";
import store from "store";
import Layout from "components/Layout";
import { TouchEventsProvider } from "hooks/touchEvents/touchEvents.hook";

const App: FC = () => (
  <Provider store={store}>
    <TouchEventsProvider>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </TouchEventsProvider>
  </Provider>
);

export default App;
