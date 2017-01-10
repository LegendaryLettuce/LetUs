import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Page, Toolbar, BackButton } from 'react-onsenui';

// Axios for requests
import axios            from 'axios';

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
    this.pushToCollaborate = this.routeToCollaborate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.randomHash = this.randomHash.bind(this);
  }

  componentDidMount() {
    // query database for friends of user
    this.setState({
      friends: ['Wilson', 'Autumn', 'Joe', 'David', 'Marc', 'Rebecca', 'Fiona'],
    });
    const socket = io();
  }

  pushToCollaborate() {
    this.props.router.push('/collaborate');
  }

  randomHash() {
    return Math.floor(Math.random() * 1000) + 'a';
  }

  routeToCollaborate() {
    axios.put(`/collaborate/ ${this.randomHash()}`, {
      creator: 'Wilson',
      yelpId: 'yelp id',
      data: this.props.yelpData,
      attendees: this.props.friends,
      checkIns: [true],

    })
      .then((response) => {
        console.log('Saved invited friends', response);
        // this.pushToCollaborate();
        // shit promise doesn't work
      })
      .catch((error) => {
        console.log('Inviting friends error', error);
      });
    this.props.router.push('/collaborate');

    // console.log(this.props.friends);
  }

  handleBack() {
    this.props.router.push('/create');
  }

  renderToolbar(toolbarTitle) {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={this.handleBack}></BackButton>
        </div>
        <div className='center' style={{ fontWeight: 'bolder' }}>{toolbarTitle}</div>
      </Toolbar>
    );
  }

  render() {
    const listStyle = {
      height: '50%',
      overflowY: 'scroll',
    };
    const header = {
      textAlign: 'center',
    };
    return (
      <Page renderToolbar={() => this.renderToolbar('Invite')}>

        <h1 style={header}>Invite Friends</h1>
        <Link />

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
  friends: state.friends,
  yelpData: state.yelpData,
});

export default connect(mapStateToProps)(Invite);
