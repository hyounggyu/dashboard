import React from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';

export class ServerSetting extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.onServerSettingSubmit();
    return;
  }
  render() {
    return (
      <Input
        type="text"
        label="IP Address"
        placeholder="127.0.0.1" />
    )
  }
}
