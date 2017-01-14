import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
import { Page, List, ListItem, Icon, Toolbar, BackButton, ListHeader, Row, Col } from 'react-onsenui';
// Styles
import { bodyStyle }            from '../../styles/styles';
// Pages
import  BottomNav        from './../../views/_global/bottomNav.jsx';

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

  render() {
    return (
    <Page renderToolbar={() => this.renderToolbar('User Profile')}
    style={{ background: 'rgba(51,51,51,1)' }}>
    <List>
      <ListItem className="timeline-li" modifier="tappable">
        <Row>
        <Col>
          <img src='http://rs387.pbsrc.com/albums/oo311/elianei/avatars/bcat_av1_100.gif~c200' style={image}/>
        </Col>
        <Col>
          <div className="timeline-from">
            <div className="timeline-name">Autumn</div>
            <div className="timeline-id">@autumns</div>
          </div>
        </Col>
        </Row>
      </ListItem>
    </List>
    <BottomNav router={this.props.router}/>
    </Page>
    );
  }
}

const mapStateToProps = state => ({
  data: state.liveData[0],
});

export default connect(mapStateToProps)(Friends);
