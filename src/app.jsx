var $ = require("jquery");
var React = require("react");

var RemoteView = require("./build/remoteview");

var Nav = React.createClass({
  handleClick: function(page) {
    this.props.onRoute(page);
    return;
  },
  render: function() {
    return (
      <nav className="menu">
        <a className="menu-item" onClick={this.handleClick.bind(null, "index")}>Home</a>
        <a className="menu-item" onClick={this.handleClick.bind(null, "remoteview")}>RemoteView</a>
      </nav>
    )
  }
});

var Monitor = React.createClass({
  getInitialState: function() {
    return {cpu: '?'};
  },
  componentDidMount: function() {
    this.timer = setInterval(this.tick, 5000);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  tick: function() {
    var self = this;
    $.getJSON('http://127.0.0.1:5000/status.json', function(result) {
      self.setState({cpu: result.cpu_percent})
    });
  },
  render: function() {
    return (
      <div>
        <p>Monitor</p>
        <p>IP: 203.237.42.187</p>
        <p>CPU: {this.state.cpu[0]}, {this.state.cpu[1]}</p>
      </div>
    )
  }
});

var Index = React.createClass({
  render: function() {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {route: "index"}
  },
  handleRoute: function(page) {
    this.setState({route: page});
  },
  render: function() {
    var Child;
    switch (this.state.route) {
      case "index": Child = Index; break;
      case "remoteview": Child = RemoteView; break;
      default: Child = Index;
    }
    return (
      <div className="container">
        <div className="columns">
          <div className="one-fifth column">
            <Nav onRoute={this.handleRoute} />
            <Monitor />
          </div>
          <div className="four-fifths column">
            <Child />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.body);
