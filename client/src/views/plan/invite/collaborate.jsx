import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { } from 'react-onsenui';
// Styles
import { }   from '../../../styles/styles';


class Collaborate extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

// inherit state of invited friends

  render() {
    return (
      <div>
        <h3>Collaborate button</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Collaborate);

