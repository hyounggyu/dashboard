var spawn = require('child_process').spawn;

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

var RemoteViewer = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    run = spawn('python', ['-m', 'datamanager', 'remoteview', '--ip=203.237.42.187', '--port=5550']);
    run.stdout.on('data', function(data) {
      console.log('stdout: '+data);
    });
    run.stderr.on('data', function(data) {
      console.log('stderr: '+data);
    });
    run.on('close', function(code) {
      console.log('child process exited with code '+code)
    })
    return;
  },
  render: function() {
    return (
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
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <RemoteViewer />
        <Modal />
      </div>
    );
  }
});

React.render(<App />, document.body);
