import $ from 'jquery';

import React from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';

class CPU extends React.Component {
  render() {
    return (
      <p>CPU:
        {this.props.data.map(function(cpu) {
          return <span>{cpu.cpu_percent}% </span>;
        })}
      </p>
    );
  }
}

class Memory extends React.Component {
  render() {
    return (
      <p>Memory: {this.props.data.percent} %</p>
    );
  }
}

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
      this.timer = setInterval(this.tick, 5000);
      this.setState({isStarted: true});
    }
  }
  updateStatus() {
    var self = this;
    $.getJSON('http://203.237.42.187:5000/status.json', (result) => {
      self.setState(result);
    });
  }
  tick() {
    this.updateStatus();
  }
  render() {
    return (
      <div>
        <p>Monitor</p>
        <button className="btn" type="button" onClick={this.handleSwitchBtn}>{this.state.isStarted ? 'Stop' : 'Start'}</button>
        <CPU data={this.state.cpu_percents} />
        <Memory data={this.state.mem} />
      </div>
    );
  }
}
