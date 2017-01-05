import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';

// Onsen UI
import ons              from 'onsenui';
import { Button } from 'react-onsenui';
// Styles
import { }   from '../../../styles/styles';

class Collaborate extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.collaborate = this.collaborate.bind(this);
  }

// inherit state of invited friends
  collaborate() {
    // send redux friends to db
    // this.props.router.push('/plan/collaborate');
    console.log(this.props.friends);
  }

  render() {
    return (
      <div>
        <Button modifier='large' onClick={this.collaborate}>Collaborate</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends,
});

export default connect(mapStateToProps)(Collaborate);

