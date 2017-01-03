import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
// Styles
import { titleStyle }   from '../styles/styles';

class Hello extends Component {
  render() {
    return (
      <div style={titleStyle}>{this.props.hello}</div>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Hello);
