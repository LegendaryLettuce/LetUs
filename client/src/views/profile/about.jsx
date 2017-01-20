import React, { Component } from 'react';
// Onsen UI
import { Page, Icon, List, ListHeader, ListItem } from 'react-onsenui';
// Styles
import { listContainer, listStyle, listBottom } from './../../styles/styles';
// Global Components
import  TopBar              from './../../views/_global/topBar.jsx';
import  BottomNav           from './../../views/_global/bottomNav.jsx';

const team = [{
  name: 'Wilson Ng',
  github: 'https://github.com/wilsonhyng',
  handle: 'wilsonhyng',
  avatar: 'https://avatars.githubusercontent.com/u/11743852?v=3',
},
{
  name: 'Joe Denea',
  github: 'https://github.com/IceFractal',
  handle: 'IceFractal',
  avatar: 'https://avatars.githubusercontent.com/u/22352825?v=3',
},
{
  name: 'David An',
  github: 'https://github.com/davidank',
  handle: 'davidank',
  avatar: 'https://avatars.githubusercontent.com/u/21187522?v=3',
},
{
  name: 'Autumn Smith',
  github: 'https://github.com/sautumn',
  handle: 'sautumn',
  avatar: 'https://avatars.githubusercontent.com/u/7321716?v=3',
}];

const link = {
  color: '#000000',
};

const gitImage = {
  marginRight: '5px',
  borderRadius: '50%',
  border: '1px solid white',
};

const letusImage = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid white',
};

const handleBack = () => {
  window.history.back();
};

class About extends Component {

  render() {
    return (
      <Page renderToolbar={TopBar.bind(this, { title: 'About', handleBack })}>
        <div style={listContainer}>
          <div style={listStyle}>
            <List>
              <ListHeader>About</ListHeader>
              <ListItem>
                <div className='left'>
                  <img src='https://pbs.twimg.com/media/CFWi-dUW8AAbwqo.png' alt='LetUsCat' style={letusImage}/>
                </div>
                <div className='center'>
                  <span>Made using React, Redux, Express, MongoDB, SocketIO, OnsenUI</span>
                  <span className='list__item__subtitle'>
                    <Icon className='left list__item__icon' icon='fa-github'/>
                      <a href='https://github.com/LegendaryLettuce/LetUs' target='_blank' className='center' style={{ textDecoration: 'none', color: 'white' }}>
                        LegendaryLettuce/LetUs
                      </a>
                  </span>
                </div>
              </ListItem>
              <ListHeader>Team Members</ListHeader>
              {
                team.map((member, i) => (
                  <ListItem tappable key={i}>
                    <div className='left'>
                      <img style={gitImage} className="list__item__thumbnail" src={member.avatar} alt={`${member.github}`}/>
                    </div>
                    <div className='center'>
                      <span className='list__item__title'>
                        {member.name}
                      </span>
                      <div className='list__item__subtitle'>
                        <Icon className='list__item__icon' icon='fa-github'/>
                          <a href={member.github} target='_blank' style={{ textDecoration: 'none', color: 'white' }}>
                            @{member.handle}
                          </a>
                      </div>
                  </div>
                  </ListItem>
                ))
              }
            </List>
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

export default About;
