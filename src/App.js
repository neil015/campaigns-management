import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './scss/campaigns.scss';
import Campaigns from './component/campaigns';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Campaigns} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;