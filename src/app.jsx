var React = require("react");

var RemoteView = require("./build/remoteview");
var Monitor = require("./build/monitor");

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h2>Monitor</h2>
        <Monitor />
        <h2>RemoteView</h2>
        <RemoteView />
      </div>
    );
  }
});

React.render(<App />, document.body);
