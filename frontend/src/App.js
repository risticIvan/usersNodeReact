import React from "react";
import "./App.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Show from "./show";
import Login from "./login";
import ErrorPage from "./errorPage";
import StartPage from "./startPage";
import Register from "./register";
import Footer from "./footer";
import List from "./list";

function Success() {
  return <Show />;
}

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Router>
          {<Route path="/" exact component={StartPage} />}
          {<Route path="/login" component={Login} />}
          {<Route path="/register" component={Register} />}
          {<Route path="/list" component={List} />}
          <Route path="/success/" component={Success} />
          <Route path="/error/" component={ErrorPage} />
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
