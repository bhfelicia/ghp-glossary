import React from "react";

import { HashRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route to="/categories"></Route>
    </Router>
  );
};
export default App;
