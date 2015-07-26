var child_process = require('child_process');

var React = require('react');

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
          <dl className="form">
            <dt><label>Step</label></dt>
            <dd><input type="text" id="step" placeholder="10" /></dd>
          </dl>
          <dl className="form">
            <dd><button className="btn" type="submit">Run</button></dd>
          </dl>
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

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="menu">
        <a className="menu-item selected" href="#">Settings</a>
        <a className="menu-item" href="#">RemoteView</a>
      </nav>
    )
  }
})

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="columns">
          <div className="one-fifth column">
            <Nav />
          </div>
          <div className="four-fifths column">
            <RemoteView />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.body);
