import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Issue from './components/Issue';
import Comment from './components/Comment';

function App() {
  return (
    
    <div className="App">
      <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/issue" component={Issue} />
      <Route path="/issue/:id" component={Comment} />
      </Router>
    </div>
    
  );
}

export default App;
