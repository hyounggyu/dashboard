var ServerSetting = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onServerSettingSubmit();
    return;
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <dl className="form">
            <dt><label>IP Address</label></dt>
            <dd><input type="text" id="ipaddr" placeholder="127.0.0.1" /></dd>
          </dl>
          <dl className="form">
            <dd><button className="btn" type="submit">Setup</button></dd>
          </dl>
        </form>
      </div>
    )
  }
});

module.exports = ServerSetting;
