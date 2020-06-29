import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './components/Dashboard'
function App() {
  return (



    <Router>
      <div className="App">
        <Header className="App-header" />

        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />

      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}


function Header() {
  return (
      <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );
}



export default App;
