// app.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Event from './components/Event';
import Invitation from './components/Invitation';
import Feedback from './components/Feedback';

function App() {
  const [events, setEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    };

    const fetchInvitations = async () => {
      const res = await axios.get('/api/invitations');
      setInvitations(res.data);
    };

    const fetchFeedbacks = async () => {
      const res = await axios.get('/api/feedback');
      setFeedbacks(res.data);
    };

    fetchEvents();
    fetchInvitations();
    fetchFeedbacks();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" render={() => <Dashboard events={events} />} />
          <Route path="/event/:id" render={() => <Event events={events} />} />
          <Route path="/invitation/:id" render={() => <Invitation invitations={invitations} />} />
          <Route path="/feedback/:id" render={() => <Feedback feedbacks={feedbacks} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
