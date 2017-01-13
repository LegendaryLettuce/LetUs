import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
import { updateLiveData, updateInviteFriends, updateYelpData, updateEventHash, updateConnectedPeers, updateTalliedVotes,   }  from '../../redux/actions';


// Axios for requests
import axios            from 'axios';

// Styles
import { }   from '../../styles/styles';

// Import Sockets
import socket from './../../sockets/sockets';

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const hash = window.location.pathname.split('/')[2];
    this.props.updateEventHash(hash);
    axios.get(`/events/${hash}`)
        .then((data) => {
          const eventData = JSON.parse(data.data.data);
          this.props.updateInviteFriends(data.data.attendees);
          this.props.updateYelpData(eventData);
          this.props.updateLiveData(eventData);
        })
        .then(() => {
          // console.log('After AJAX', this.props.yelpData);
          const eventPeerUpdaters = {
            connectedPeers: this.props.updateConnectedPeers,
            talliedVotes: this.props.updateTalliedVotes,
            liveData: this.props.updateLiveData,
          };
          // console.log('liveData when get link:', this.props.liveData);
          const eventPeerStates = {
            liveData: this.props.liveData,
            talliedVotes: this.props.talliedVotes,
            yelpData: this.props.yelpData,
          };
          socket.initSocket(hash, eventPeerUpdaters, eventPeerStates);
          this.props.router.push('/collaborate');
        });
  }

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
});

const mapStateToProps = state => ({
  yelpData: state.yelpData,
  eventHash: state.eventHash,
  liveData: state.liveData,
  talliedVotes: state.talliedVotes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
