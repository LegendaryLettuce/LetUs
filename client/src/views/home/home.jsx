import React, { Component } from 'react';
// Onsen UI
import { Page }         from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { load, updateHomeEventPage, updateParentPage }         from '../../redux/actions';
// Utils
import { getStore, getUpcomingEvents } from '../../utils/utils';
// Global Components
import  TopBar          from './../../views/_global/topBar.jsx';
import  BottomNav       from './../../views/_global/bottomNav.jsx';
import  BottomButton    from './../../views/_global/bottomButton.jsx';
// Local Components
import  Events          from './components/events.jsx';

const listStyle = {
  height: '80%',
  overflowY: 'scroll',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.routeToLatlon = this.routeToLatlon.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      upcomingEvents: [],
    };
    this.props.updateParentPage('/home');
    this.handleTouch = this.handleTouch.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    if (!this.props.loaded) this.props.load(getStore());
  }

  componentDidMount() {
    if (this.props.loaded) {
      getUpcomingEvents(this.props.user.id)
        .then((res) => {
          this.setState({ upcomingEvents: res.data });
          console.log('HOME!-', res.data);
        });
    } else {
      setTimeout(this.componentDidMount.bind(this), 10);
    }
  }

  routeToLatlon() {
    this.props.router.push('/search');
  }

  handleBack() {
    window.history.back();
    // this.props.router.push('/');
  }

  handleTouch(selected) {
    this.props.updateHomeEventPage(selected);
    this.props.router.push('/homeevent');
  }

  render() {
    return (
      <Page renderToolbar={TopBar.bind(this, { title: 'Home', handleBack: this.handleBack })}>
        <div style={listStyle}>
          <Events events={this.state.upcomingEvents} handleTouch={this.handleTouch}/>
        </div>
        <BottomButton title={'Create an Event'} route={this.routeToLatlon}/>
        <BottomNav router={this.props.router}/>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  load: (state) => {
    dispatch(load(state));
  },
  updateHomeEventPage: (homeEventPageData) => {
    dispatch(updateHomeEventPage(homeEventPageData));
  },
  updateParentPage: (parentPage) => {
    dispatch(updateParentPage(parentPage));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
