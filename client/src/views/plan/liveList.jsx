import React, { Component }       from 'react';
// Onsen UI
// import ons              from 'onsenui';
import { Page, Toolbar, List, ListItem, Button, BackButton } from 'react-onsenui';
// Axios
import axios            from 'axios';
// Redux
import { connect }      from 'react-redux';
import { updateYelpData, updateEventPage, updateParentPage } from '../../redux/actions';
// Subcomponents
import GenericList from './../_global/genericList.jsx';
import VotesProgress from './collaborate/progressBar.jsx';

// Styles
import { buttonStyle }   from '../../styles/styles';

const padStyle = {
  height: '12%',
};

class LiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: {
        expectedVotes: ((this.props.friends.length + 1) * this.props.liveData.length),
        connectedPeers: (this.props.connectedPeers * this.props.liveData.length),
        talliedVotes: this.props.talliedVotes,
      },
      topEvent: [],
    };
    this.props.updateParentPage('/live');
    this.handleBack = this.handleBack.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.goEvent = this.goEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('hELLO RECEIVE PROPS');

    this.setState({
      topEvent: JSON.stringify([this.props.liveData[0]]),
    });
    // console.log(this.state.topEvent);
    axios.put('/home/', {
      topEvent: this.state.topEvent,
      linkHash: this.props.eventHash,
    })
      .then((res) => {
        console.log('Saved top event', res);
      })
      .catch((error) => {
        console.log('Saving top events error', error);
      });
  }

  handleBack() {
    console.log('HANDLING BACK');
  }

  handleTouch(selected) {
    this.props.updateEventPage(selected);
    this.props.router.push('/event');
  }

  goEvent() {
    this.props.updateEventPage(this.props.liveData[0]);
    this.props.router.push('/event');
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={this.handleBack}></BackButton>
        </div>
        <div className='center' style={{ fontWeight: 'bolder' }}>{'Live List'}</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page
        renderToolbar={() => this.renderToolbar()}
      >
        <VotesProgress
          expectedVotes={((this.props.friends.length + 1) * this.props.liveData.length)}
          talliedVotes={this.props.talliedVotes}
          connectedPeers={(this.props.connectedPeers * this.props.liveData.length)}
        />
        <GenericList
            data={this.props.liveData}
            handleTouch={this.handleTouch}
          />
        <div style={padStyle}/>
        <Button
          className='center'
          style={buttonStyle}
          onClick={this.goEvent}
        >Top Event</Button>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
  updateEventPage: (eventPageData) => {
    dispatch(updateEventPage(eventPageData));
  },
  updateParentPage: (parentPage) => {
    dispatch(updateParentPage(parentPage));
  },
});

const mapStateToProps = state => ({
  eventHash: state.eventHash,
  liveData: state.liveData,
  friends: state.friends,
  connectedPeers: state.connectedPeers,
  talliedVotes: state.talliedVotes,
  eventPageData: state.eventPageData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
