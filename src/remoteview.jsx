import child_process from 'child_process';

import React from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';

export class RemoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {output: ""};
  }
  handleRemoteView(e) {
    this.setState({output: ""});
    let ip = this.props.hostname;
    let step = this.refs.step.getValue();
    step = step == "" ? "1" : step;
    let run = child_process.spawn("python", ["-u", "-m", "xni.manage", "remoteview", "--ip="+ip, "--step="+step]);
    // TODO: form disable
    //run = child_process.spawn("python", ["-u", __dirname+"/../scripts/hello.py"]);
    run.stdout.on("data", (data) => {
      this.setState((previousState, currentProps) => {
        return {output: previousState.output + "" + data};
      });
    }.bind(this));
    run.stderr.on("data", (data) => {
      this.setState((previousState, currentProps) => {
        return {output: previousState.output + "" + data};
      });
    }.bind(this));
    run.on("close", (code) => {
      this.setState((previousState, currentProps) => {
        return {output: previousState.output + "child process exited with code " + code};
      });
      // TODO: form enable
    }.bind(this));
  }
  render() {
    return (
      <div>
        <form>
          <Input type="text" ref="step" label="Step" placeholder="1" />
          <ButtonInput value="Run" onClick={(e) => this.handleRemoteView(e)} />
        </form>
        <Panel>
          <p>{this.state.output}</p>
        </Panel>
      </div>
    );
  }
}
