import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
import { Page, List, ListItem, Icon, Toolbar, BackButton, ListHeader, Row, Col } from 'react-onsenui';
// Styles
import { listContainer, listStyle, listBottom }  from '../../styles/styles';

// Global Components
import  BottomNav        from './../../views/_global/bottomNav.jsx';
import  TopBar           from './../../views/_global/topBar.jsx';

const image = {
  height: '75px',
  width: '75px',
  borderRadius: '50%',
  WebkitBorderRadius: '50%',
  backgroundColor: 'black',
  border: '1px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 0px',
  WebkitBoxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 0px 0px',
};

class Friends extends Component {
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

  handleBack() {
    window.history.back();
  }

  render() {
    return (
    <Page renderToolbar={TopBar.bind(this, { title: 'Friends', handleBack: this.handleBack })}>
      <div style={listContainer}>
        <div style={listStyle}>
        <List
          dataSource={this.props.friends}
            renderRow={
              (friend, idx) => (
                <ListItem key={idx} modifier={idx === this.props.friends.length - 1 ? 'longdivider' : null}>
                  <div className="left">
                    <img className="list__item__image" alt="Top Friend Image" style ={image} src='http://rs387.pbsrc.com/albums/oo311/elianei/avatars/bcat_av1_100.gif~c200' />
                  </div>
                  <div className="center">
                    <span className="list__item__title">{friend.name}</span>
                    <span className="list__item__subtitle">
                      GL HF
                    </span>
                  </div>
              </ListItem>
              )
            }
          />
        </div>
        <div style={{
          ...listBottom,
          minHeight: '44px',
        }}/>
        </div>
       <BottomNav router={this.props.router}/>
    </Page>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.user.friends,
});

export default connect(mapStateToProps)(Friends);

