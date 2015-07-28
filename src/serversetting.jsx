import React from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';

export class ServerSetting extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange(e) {
    this.props.setServer(e.target.value);
  }
  render() {
    return (
      <div>
        <Input type="text" ref="hostname" label="Hostname or IP Address" placeholder={this.props.hostname} onChange={(e)=>this.handleChange(e)} />
      </div>
    )
  }
}
