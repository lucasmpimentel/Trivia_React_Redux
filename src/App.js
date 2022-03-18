import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/dashboard" component={ Dashboard } />
        <Route excat path="/feedback" component={ Feedback } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </BrowserRouter>
  );
}
