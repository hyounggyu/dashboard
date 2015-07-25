var child_process = require('child_process');

var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var Terminal = React.createClass({
  render: function() {
    return (
      <div className="terminal">
        <pre className="terminal">{this.props.data}</pre>
      </div>
    );
  }
});

var RemoteViewForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onRemoteViewSubmit();
    return;
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="ip" placeholder="IP Address" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="slice" placeholder="0:1:1" />
          </div>
          <button type="submit" className="btn btn-default">Run</button>
        </form>
      </div>
    );
  }
});

var RemoteView = React.createClass({
  getInitialState: function() {
    return {data: ''};
  },
  handleRemoteViewSubmit: function() {
    //run = child_process.spawn('python', ['-u', '-m', 'datamanager', 'remoteview']);
    this.setState();
    run = child_process.spawn('python', ['-u', __dirname+'/scripts/hello.py']);
    run.stdout.on('data', function(data) {
      //process.stdout.write(''+data);
      this.setState(function(previousState, currentProps) {
        return {data: previousState.data + '' + data};
      });
    }.bind(this));
    run.stderr.on('data', function(data) {
      //process.stderr.write(''+data);
      this.setState(function(previousState, currentProps) {
        return {data: previousState.data + '' + data};
      });
    }.bind(this));
    run.on('close', function(code) {
      this.setState(function(previousState, currentProps) {
        return {
          data: previousState.data + 'child process exited with code ' + code
        };
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <RemoteViewForm onRemoteViewSubmit={this.handleRemoteViewSubmit} />
        <Terminal data={this.state.data} />
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <RemoteView />
      </div>
    );
  }
});

React.render(<App />, document.body);
