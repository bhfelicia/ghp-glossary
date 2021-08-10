import React from "react";

import { HashRouter as Router, Route } from "react-router-dom";

import Glossary from "./Glossary";
import Category from "./Category";

const App = () => {
  return (
    <Router>
      <Route exact path="/glossary" component={Glossary}></Route>
      <Route exact path="/glossary/:id" component={Category}></Route>
      <Route exact path="/questions">
        Q+A
      </Route>
    </Router>
  );
};
export default App;
