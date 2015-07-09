var child_process = require('child_process');

var Nav = React.createClass({
  render: function() {
    return (
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Help</a></li>
      </ul>
    );
  }
});

var Modal = React.createClass({
  render: function() {
    return (
      <pre>{this.props.data}</pre>
    );
  }
});

var RemoteViewer = React.createClass({
  getInitialState: function() {
    return {data: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    run = child_process.spawn('python', ['-u', '-m', 'datamanager', 'remoteview']);
    run.stdout.on('data', function(data) {
      this.setState(function(previousState, currentProps) {
        return {data: previousState.data + '' + data};
      });
    }.bind(this));
    run.stderr.on('data', function(data) {
      this.setState(function(previousState, currentProps) {
        return {data: previousState.data + '' + data};
      });
    }.bind(this));
    run.on('close', function(code) {
      this.setState(function(previousState, currentProps) {
        return {data: previousState.data + 'child process exited with code ' + code};
      });
    }.bind(this));
    return;
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="ip">IP</label>
            <input type="text" className="form-control" id="ip" placeholder="IP Address" />
          </div>
          <div className="form-group">
            <label for="slice">Slice</label>
            <input type="text" className="form-control" id="slice" placeholder="0:1:1" />
          </div>
          <button type="submit" className="btn btn-default">Run</button>
        </form>
        <Modal data={this.state.data} />
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <RemoteViewer />
      </div>
    );
  }
});

React.render(<App />, document.body);
