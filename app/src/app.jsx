var child_process = require('child_process');

var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var StdoutModal = React.createClass({
  close: function() {
    return;
  },
  render: function() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Process Stdout</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <pre>{this.props.data}</pre>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide}>Stop</Button>
          </Modal.Footer>
        </Modal>
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
    return {data: '', showModal: false};
  },
  handleRemoteViewSubmit: function() {
    //run = child_process.spawn('python', ['-u', '-m', 'datamanager', 'remoteview']);
    this.setState({showModal: true});
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
          data: previousState.data + 'child process exited with code ' + code,
          showModal: false
        };
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <RemoteViewForm onRemoteViewSubmit={this.handleRemoteViewSubmit} />
        <StdoutModal data={this.state.data} showModal={this.state.showModal}/>
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
