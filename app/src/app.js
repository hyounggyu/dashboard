var Nav = React.createClass({
  render: function () {
    return (
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Help</a></li>
      </ul>
    );
  }
});

var RemoteViewer = React.createClass({
  render: function() {
    return (
      <h1>Hello</h1>
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
