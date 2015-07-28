var React = require("react");

var ServerSetting = require("./dist/serversetting");
var RemoteView = require("./dist/remoteview");
var Monitor = require("./dist/monitor");

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h2>Server</h2>
        <ServerSetting />
        <h2>Monitor</h2>
        <Monitor />
        <h2>RemoteView</h2>
        <RemoteView />
      </div>
    );
  }
});

React.render(<App />, document.body);
