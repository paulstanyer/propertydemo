import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AddPropertyFormContainer } from "./addPropertyForm/addPropertyForm";
import { PropertyDetailsContainer } from "./propertyDetails/propertyDetailsContainer";
import { PropertyListContainer } from "./propertyList";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/admin/add" children={<AddPropertyFormContainer />} />
        <Route path="/properties/:id" children={<PropertyDetailsContainer />} />
        <Route path="/" children={<PropertyListContainer />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
