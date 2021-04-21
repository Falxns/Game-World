import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Home from "./pages/Home/home";
import AddGame from "./pages/AddGame/addGame";
import Game from "./pages/Game/game";
import Login from "./pages/Login/login";
import Registration from "./pages/Registration/registration";

function App() {
  return (
    <>
      <Router>
        <div className="content">
          <Header />
          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/addgame">
              <AddGame />
            </Route>
            <Route path={"/games/:gameId"}>
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
