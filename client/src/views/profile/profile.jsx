import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
import { Page, List, ListItem, Icon, Toolbar, BackButton } from 'react-onsenui';
// Styles
import { bodyStyle }            from '../../styles/styles';
// Pages
import  BottomNav        from './../../views/_global/bottomNav.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = toolbarTitle => (
      <Toolbar>
        <div className="left">
          <BackButton></BackButton>
        </div>
        <div className='center' style={{ fontWeight: 'bolder' }}>{toolbarTitle}</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={() => this.renderToolbar('User Profile')}
      style={{ background: 'rgba(51,51,51,1)' }}>
      <div>Wilson Ng</div>
      <div>@nosliw</div>
      <List>
        <ListItem>Something here</ListItem>
      </List>
      <BottomNav></BottomNav>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  data: state.liveData[0],
});

export default connect(mapStateToProps)(Profile);
