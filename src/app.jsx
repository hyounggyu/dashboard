var React = require("react");

var RemoteView = require("./build/remoteview");
var Monitor = require("./build/monitor");

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
