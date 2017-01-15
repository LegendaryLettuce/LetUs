import React, { Component } from 'react';
// Onsen UI
import { Page }         from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { load }         from '../../redux/actions';
// Utils
import { getStore, getUpcomingEvents } from '../../utils/utils';
// Global Components
import  TopBar          from './../../views/_global/topBar.jsx';
import  BottomNav       from './../../views/_global/bottomNav.jsx';
import  BottomButton    from './../../views/_global/bottomButton.jsx';
// Local Components
import  Events          from './components/events.jsx';

const listStyle = {
  height: '50%',
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
  }

  componentWillMount() {
    if (!this.props.loaded) {
      this.props.load(getStore());
    }
  }

  componentDidMount() {
    const up = getUpcomingEvents(this.props.user.id);
    console.log(up);
    up.then((res) => {
      this.setState({ upcomingEvents: res.data });
    });
  }

  routeToLatlon() {
    this.props.router.push('/search');
  }

  handleBack() {
    this.props.router.push('/');
  }

  render() {
    return (
      <Page renderToolbar={TopBar.bind(this, ({ title: 'Home', handleBack: this.handleBack }))}>
        <div style={listStyle}>
          <Events events={this.state.upcomingEvents}/>
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
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
