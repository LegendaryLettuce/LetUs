import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Page } from 'react-onsenui';
// Styles
import { }   from '../../styles/styles';

import  Link            from './invite/link.jsx';
import  Friends         from './invite/friends.jsx';
import  Collaborate      from './invite/collaborate.jsx';
import  BottomNav        from './../../views/_global/bottomNav.jsx';

class Invite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
    this.routeToCollaborate = this.routeToCollaborate.bind(this);
  }

  componentDidMount() {
    // query database for friends of user
    this.setState({
      friends: ['Wilson', 'Autumn', 'Joe', 'David', 'Louis', 'Omar'],
    });
  }

  routeToCollaborate() {
    this.props.router.push('/collaborate');
    console.log(this.props.friends);
  }

  render() {
    const listStyle = {
      height: '50%',
      overflowY: 'scroll',
    };
    return (
      <Page>

        <h1>Link</h1>
        <Link />

        <h1>Invite Friends</h1>

        <div style={listStyle}>

          <Friends friends={this.state.friends}/>

        </div>

        <Collaborate route={this.routeToCollaborate}/>

        <BottomNav></BottomNav>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Invite);
