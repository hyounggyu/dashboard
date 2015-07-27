var $ = require("jquery");

var CPU = React.createClass({
  render: function() {
    return (
      <p>CPU:
        {this.props.data.map(function(cpu) {
          return <span>{cpu.cpu_percent}% </span>;
        })}
      </p>
    );
  }
});

var Memory = React.createClass({
  render: function() {
    return (
      <p>Memory: {this.props.data.percent} %</p>
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
        <CPU data={this.state.cpu_percents} />
        <Memory data={this.state.mem} />
      </div>
    );
  }
});

module.exports = Monitor;
