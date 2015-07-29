import React from 'react';

import {Panel} from 'react-bootstrap';

import {RemoteView} from './remoteview';
import {ServerSetting} from './serversetting';
import {Monitor} from './monitor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hostname: '127.0.0.1'};
  }
  setServer(hostname) {
    this.setState({hostname: hostname});
  }
  render() {
    return (
      <div className="container">
        <Panel header="Server Setting">
          <ServerSetting hostname={this.state.hostname} setServer={(hostname) => this.setServer(hostname)} />
        </Panel>
        <Panel header="Server Monitor">
          <Monitor hostname={this.state.hostname} />
        </Panel>
        <Panel header="Remote Viewer">
          <RemoteView hostname={this.state.hostname} />
        </Panel>
      </div>
    );
  }
}

React.render(<App />, document.body);
