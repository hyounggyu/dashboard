import child_process from 'child_process';

import React from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';

class Terminal extends React.Component {
  render() {
    return (
      <div className="terminal">
        <pre className="terminal">{this.props.data}</pre>
      </div>
    );
  }
}

class RemoteViewForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.onRemoteViewSubmit();
    return;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <dl className="form">
            <dt><label>Step</label></dt>
            <dd><input type="text" id="step" placeholder="10" /></dd>
          </dl>
          <dl className="form">
            <dd><button className="btn" type="submit">Run</button></dd>
          </dl>
        </form>
      </div>
    );
  }
}

export class RemoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ""};
  }
  handleRemoteViewSubmit() {
    this.setState({data: ""});
    run = child_process.spawn("python", ["-u", "-m", "xni.manage", "remoteview", "--ip", "203.237.42.187"]);
    //run = child_process.spawn("python", ["-u", __dirname+"/../scripts/hello.py"]);
    run.stdout.on("data", (data) => {
      //process.stdout.write(""+data);
      this.setState((previousState, currentProps) => {
        return {data: previousState.data + "" + data};
      });
    }.bind(this));
    run.stderr.on("data", (data) => {
      //process.stderr.write(""+data);
      this.setState((previousState, currentProps) => {
        return {data: previousState.data + "" + data};
      });
    }.bind(this));
    run.on("close", (code) => {
      this.setState((previousState, currentProps) => {
        return {data: previousState.data + "child process exited with code " + code};
      });
    }.bind(this));
  }
  render() {
    return (
      <div>
        <RemoteViewForm onRemoteViewSubmit={this.handleRemoteViewSubmit} />
        <Terminal data={this.state.data} />
      </div>
    );
  }
}
