import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
import { Page, List, ListItem, Icon, Toolbar, BackButton, ListHeader } from 'react-onsenui';
// Styles
import { bodyStyle }            from '../../styles/styles';
// Pages
import  BottomNav        from './../../views/_global/bottomNav.jsx';

const image = {
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  WebkitBorderRadius: '50%',
  backgroundColor: 'black',
  border: '1px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 0px',
  WebkitBoxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 0px',
};

const top = {
  textAlign: 'center',
  padding: '10px',
};

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
      <div style={top}>
        <img style={image} alt='{name}' src="http://www.animenewsnetwork.com/thumbnails/hotlink-max1000x1500/cms/news/105293/parappa.jpg"/>
        <div style={bodyStyle}>Wilson Ng</div>
        <div>@nosliw</div>
      </div>
      <List>
        <ListHeader>Profile</ListHeader>
        <ListItem modifier="chevron" tappable>Friends List</ListItem>
        <ListItem modifier="chevron" tappable>Past Events</ListItem>
        <ListItem modifier="chevron" tappable>Hosted Events</ListItem>
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
