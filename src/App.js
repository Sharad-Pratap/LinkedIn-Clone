import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Login from './components/Login';
import { getUserAuth } from "../src/components/Login"
import { connect } from "react-redux";

function App(props) {

  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<> <Header /> <Home /></>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
