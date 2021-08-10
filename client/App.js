import React from "react";

import { HashRouter as Router, Route, Link } from "react-router-dom";

import Glossary from "./Glossary";
import Category from "./Category";

const App = () => {
  return (
    <div>
      <h1 id="welcome">Welcome to the Power Programmers' MiniLearn!</h1>

      <Router>
        <div id="widgets">
          <Link to="/glossary">Glossary</Link>
          <Link to="/Q+A">Q + A</Link>
        </div>
        <Route exact path="/glossary" component={Glossary}></Route>
        <Route exact path="/glossary/:id" component={Category}></Route>
        <Route exact path="/questions">
          Q+A
        </Route>
      </Router>
    </div>
  );
};
export default App;
