import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import '../App.css';
const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}> </Route>
    <Route path="/homepage" component={Homepage}> </Route>
    <Route path="/signup" component={Signup}> </Route>
  </Router>,
app);