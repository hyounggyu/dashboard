import $ from 'jquery';

import React from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';

export class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cpu_percents: [], mem: {percent: '?'}, isStarted: false};
  }
  handleSwitchBtn() {
    if (this.state.isStarted) {
      clearInterval(this.timer);
      this.setState({isStarted: false});
    } else {
      this.updateStatus();
      this.timer = setInterval(() => this.updateStatus(), 5000);
      this.setState({isStarted: true});
    }
  }
  updateStatus() {
    var self = this;
    $.getJSON('http://203.237.42.187:5000/status.json', (result) => {
      self.setState(result);
    });
  }
  render() {
    return (
      <form>
        <Input type="text" ref="port" placeholder="5000" />
        <ButtonInput value={this.state.isStarted ? 'Stop' : 'Start'} onClick={() => this.handleSwitchBtn()} />
        <Panel>
          <p>CPU: {this.state.cpu_percents.map((c) => {
            return <span key={c.cpu_id}>{c.cpu_percent}% </span>;
          })}</p>
          <p>Memory: {this.state.mem.percent} %</p>
        </Panel>
      </form>
    );
  }
}
