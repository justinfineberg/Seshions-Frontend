import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PartyPage from "./components/PartyPage";
import ProtectedRoute from "./services/ProtectedRoute";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [allParties, setAllParties] = useState([]);
  const { push } = useHistory();

  const token = localStorage.getItem("token");

  if (token) {
    push("/dashboard");
  }

  return (
    <div className="App">
      <header className="h-14 w-full bg-purple-500 flex justify-between items-center">
        <div className="text-4xl font-bold flex justify-center align-left ml-4 md:ml-10 text-white">
          <Link to="/dashboard"> Seshions </Link>
        </div>
        <nav className=" m-10 flex text-white underline justify-between w-36">
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <Switch>
        <Route path="/party/:party_id" component={PartyPage}></Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
