import React, { Component } from 'react';
// Onsen UI
import { Page, Icon, List, ListHeader, ListItem } from 'react-onsenui';
// Redux
import { connect }          from 'react-redux';
// Styles
import { bodyStyle }        from './../../styles/styles';
// Global Styles
import  TopBar              from './../../views/_global/topBar.jsx';
import  BottomNav           from './../../views/_global/bottomNav.jsx';

const team = [{
  name: 'Wilson Ng',
  github: 'https://github.com/wilsonhyng',
  handle: 'wilsonhyng',
},
{
  name: 'Joe Denea',
  github: 'https://github.com/IceFractal',
  handle: 'IceFractal',
},
{
  name: 'David An',
  github: 'https://github.com/davidank',
  handle: 'davidank',
},
{
  name: 'Autumn Smith',
  github: 'https://github.com/sautumn',
  handle: 'sautumn',
}];

const link = {
  color: '#000000',
};

class About extends Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    window.history.back();
  }

  render() {
    return (
      <Page style={bodyStyle} renderToolbar={TopBar.bind(this, { title: 'About', handleBack: this.handleBack })}>
        <List>
          <ListHeader>About</ListHeader>
          <ListItem>
            <span>Made using React, Redux, OnsenUI, MongoDB, Express.</span>
            <span className='list__item__subtitle'>
              <Icon className='left list__item__icon' icon='fa-github'/>
                <a href='https://github.com/LegendaryLettuce/LetUs' target='_blank' className='center' style={{ textDecoration: 'none', color: 'white' }}>
                Project Repo
                </a>
            </span>
          </ListItem>
          <ListHeader>Team Members</ListHeader>
          { team.map(member => (
            <ListItem tappable>
              <span className='list__item__title'>
                {member.name}
              </span>
              <span className='list__item__subtitle'>
                <Icon className='left list__item__icon' icon='fa-github'/>
                  <a href={member.github} target='_blank' className='center' style={{ textDecoration: 'none', color: 'white' }}>
                    @{member.handle}
                  </a>
              </span>
            </ListItem>
          ))}
        </List>
        <BottomNav router={this.props.router}/>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(About);
