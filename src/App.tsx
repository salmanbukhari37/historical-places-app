import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Helmet } from "react-helmet";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <title>Historical Places App</title>
        </Helmet>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
