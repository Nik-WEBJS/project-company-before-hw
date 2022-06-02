import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login:type?" component={Login} />
        <Route path="/users/:id?/:edit?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
