import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './screens/Main';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main} />
    </Router>
  );
}

export default App;
