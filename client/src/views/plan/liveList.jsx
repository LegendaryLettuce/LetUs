import React, { Component }       from 'react';
// Onsen UI
import ons              from 'onsenui';
import { Page, Toolbar, List, ListItem, Button, BackButton } from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { updateYelpData } from '../../redux/actions';
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
        expectedVotes: 10,
        connectedPeers: 8,
        talliedVotes: 4,
      },
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.goEvent = this.goEvent.bind(this);
  }

  handleBack() {
    console.log('HANDLING BACK');
  }

  handleTouch() {
    console.log('HANDLING TOUCH');
  }

  goEvent() {
    // need to send redux the first item in liveData
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
        <VotesProgress votes={this.state.votes} />
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
});

const mapStateToProps = state => ({
  liveData: state.liveData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
