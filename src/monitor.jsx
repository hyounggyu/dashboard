var $ = require("jquery");

var CPU = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.data.map(function(cpu) {
          return <li key={cpu.cpu_id}>{cpu.cpu_percent} %</li>;
        })}
      </ul>
    );
  }
});

var Memory = React.createClass({
  render: function() {
    return (
      <ul>
        <li>{this.props.data.percent} %</li>
      </ul>
    );
  }
});

var Monitor = React.createClass({
  getInitialState: function() {
    return {cpu_percents: [], mem: {percent: '?'}, isStarted: false};
  },
  handleSwitchBtn: function() {
    if (this.state.isStarted) {
      clearInterval(this.timer);
      this.setState({isStarted: false});
    } else {
      this.updateStatus();
      this.timer = setInterval(this.tick, 5000);
      this.setState({isStarted: true});
    }
  },
  updateStatus: function() {
    var self = this;
    $.getJSON('http://203.237.42.187:5000/status.json', function(result) {
      self.setState(result);
    });
  },
  tick: function() {
    this.updateStatus();
  },
  render: function() {
    return (
      <div>
        <p>Monitor</p>
        <button className="btn" type="button" onClick={this.handleSwitchBtn}>{this.state.isStarted ? 'Stop' : 'Start'}</button>
        <p>CPU Loads</p>
        <CPU data={this.state.cpu_percents} />
        <p>Memory</p>
        <Memory data={this.state.mem} />
      </div>
    );
  }
});

module.exports = Monitor;
