import React, { Component } from 'react';
// Redux
import { connect }          from 'react-redux';
// Onsen UI
// import ons                  from 'onsenui';
import { BottomToolbar, Icon, BackButton, ToolbarButton } from 'react-onsenui';
// Styles
import { bottomNavStyle }   from '../../styles/styles';

class BottomNav extends Component {

  constructor(props) {
    super(props);
    this.routeToHome = this.routeToHome.bind(this);
    this.routeToFriends = this.routeToFriends.bind(this);
  }

  routeToHome() {
    this.props.router.push('/home');
  }

  routeToFriends() {
    this.props.router.push('/friends');
  }

  render() {
    return (
      <BottomToolbar style = { bottomNavStyle } >
        <div className="left">
          <ToolbarButton>
            {/* Home */}
            <Icon icon="fa-home" onClick={this.routeToHome}/>
          </ToolbarButton>
        </div>
        <div className="center">
          <ToolbarButton>
            <Icon icon="fa-users" onClick={this.routeToFriends}/>
          </ToolbarButton>
        </div>
        <div className="right">
          <ToolbarButton>
            <Icon icon="fa-cog"/>
            {/* Create */}
          </ToolbarButton>
        </div>
      </BottomToolbar>
    );
  }
}

const mapStateToProps = state => ({
  BottomNav: state.BottomNav,
});

export default connect(mapStateToProps)(BottomNav);
