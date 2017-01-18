import React, { Component } from 'react';
// Axios
import axios            from 'axios';
// Redux
import { connect }      from 'react-redux';
import {
  load,
  updateLiveData,
  updateInviteFriends,
  updateYelpData,
  updateEventHash,
  updateConnectedPeers,
  updateTalliedVotes,
}                       from '../../redux/actions';
// Utils
import { getStore }     from '../../utils/utils';
// Styles
// import { }              from '../../styles/styles';
// Sockets
import socket           from './../../sockets/sockets';

class Loading extends Component {

  componentWillMount() {
    if (!this.props.loaded) this.props.load(getStore());
    const hash = window.location.pathname.split('/')[2];
    axios.get(`/events/${hash}`)
        .then((data) => {
          const eventData = JSON.parse(data.data.data);
          this.props.updateEventHash(hash);
          this.props.updateInviteFriends(JSON.parse(data.data.attendees));
          this.props.updateYelpData(eventData);
          this.props.updateLiveData(eventData);
        })
        .then(() => {
          // console.log('After AJAX', this.props.yelpData);
          const eventPeerUpdaters = {
            connectedPeers: this.props.updateConnectedPeers,
            talliedVotes: this.props.updateTalliedVotes,
            liveData: this.props.updateLiveData,
            inviteFriends: this.props.updateInviteFriends,
          };
          // console.log('liveData when get link:', this.props.liveData);
          const eventPeerStates = {
            liveData: this.props.liveData,
            talliedVotes: this.props.talliedVotes,
            yelpData: this.props.yelpData,
            user: this.props.user,
          };
          socket.initSocket(hash, eventPeerUpdaters, eventPeerStates);
          this.props.router.push('/collaborate');
        });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
  updateInviteFriends: (friends) => {
    dispatch(updateInviteFriends(friends));
  },
  updateEventHash: (eventHash) => {
    dispatch(updateEventHash(eventHash));
  },
  updateConnectedPeers: (connectedPeers) => {
    dispatch(updateConnectedPeers(connectedPeers));
  },
  updateTalliedVotes: (talliedVotes) => {
    dispatch(updateTalliedVotes(talliedVotes));
  },
  updateLiveData: (liveData) => {
    dispatch(updateLiveData(liveData));
  },
  load: (state) => {
    dispatch(load(state));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  yelpData: state.yelpData,
  eventHash: state.eventHash,
  liveData: state.liveData,
  talliedVotes: state.talliedVotes,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
