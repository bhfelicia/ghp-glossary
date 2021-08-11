import React from "react";

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import Glossary from "./Glossary";
import Category from "./Category";
import AddTerm from "./AddTerm";

const App = () => {
  return (
    <div>
      <h1 id="welcome">Welcome to the Power Programmers' MiniLearn!</h1>

      <Router>
        <div id="widgets">
          <Link to="/glossary">Glossary</Link>
          <Link to="/Q+A">Q + A</Link>
        </div>
        <Switch>
          <Route exact path="/glossary" component={Glossary}></Route>
          <Route exact path="/glossary/:id" component={Category}></Route>
          <Route exact path="/glossary/:catId" component={AddTerm}></Route>
          <Route exact path="/questions">
            Q+A
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
