import React from 'react';

import {RemoteView} from './dist/remoteview';
import {ServerSetting} from './dist/serversetting';
import {Monitor} from './dist/monitor';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h2>Server</h2>
        <ServerSetting />
        <h2>Monitor</h2>
        <Monitor />
        <h2>RemoteView</h2>
        <RemoteView />
      </div>
    );
  }
}

React.render(<App />, document.body);
