import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
import { Page, List, ListItem, Icon, Toolbar } from 'react-onsenui';
// Styles
import { bodyStyle }            from '../../styles/styles';
// Pages
import  BottomNav        from './../../views/_global/bottomNav.jsx';

const iconPadding = {
  marginRight: '10px',
};

const imageDiv = {
  ...bodyStyle,
  height: '300px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 0,
};

const eventTitle = {
  color: 'white',
  textAlign: 'center',
  textShadow: '0px 0px 3px #000',
  fontSize: '40px',
};

const tagline = {
  textAlign: 'center',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '13px',
  color: 'white',
};

const imageTint = {
  height: '300px',
  backgroundColor: 'rgba(0,0,0,.5)',
  margin: 'auto',
  position: 'relative',
};

const titleText = {
  ...bodyStyle,
  position: 'absolute',
  bottom: 0,
  textAlign: 'center',
};

const tags = {
  borderRadius: '12px',
  padding: '5px',
  textAlign: 'center',
  background: 'gray',
  margin: '7px',
};

// const address = (location) => {
//   return location.display_address.join(',');
// }

class Event extends Component {
  constructor(props) {
    super(props);
    this.starRating = (rating) => {
      const a = new Array(Math.floor(rating)).fill(0);
      if (rating - Math.floor(rating) !== 0) {
        a.push(1);
      }
      return a;
    };
    this.renderToolbar = toolbarTitle => (
      <Toolbar>
        <div className='center' style={{ fontWeight: 'bolder' }}>{toolbarTitle}</div>
      </Toolbar>
    );
    this.getUrl = url => (url.replace('ms.jpg', 'l.jpg'));
  }

  // router
  // decideCreate() {
  //   this.props.router.push('/create');
  // }

  render() {
    return (
        <Page modifier='shop-details' renderToolbar={() => this.renderToolbar('Event Details')}
        style={{ background: 'rgba(51,51,51,1)' }}>
          <div style={{
            ...imageDiv,
            background: `url(${this.getUrl(this.props.data.imageUrl)}) 100%`,
          }}>
            <div style={imageTint}>
              <div style={titleText}>
                <span style={eventTitle}>{this.props.data.displayTitle}</span><br/>
                <p style={tagline}>{this.props.data.snippetText}</p>
                <div>
                  {this.starRating(this.props.data.rating).map((e, i) => (
                    <Icon icon={`fa-star${e ? '-half' : ''}`} fixed-width='false' key={i}></Icon>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {this.props.data.categories.map((cat, i) => (
              <div style={tags} key={i}>{cat[0]}</div>
            ))}
          </div>
          <List>
            <a href={`http://maps.google.com/?q=${this.props.data.displayAddress.join(', ')}`} target='_blank' style={{ textDecoration: 'none' }}>
              <ListItem tappable>
                <Icon icon='fa-map-marker' style={iconPadding}/>
                {this.props.data.displayAddress.join(', ')}
              </ListItem>
            </a>
            <ListItem tappable><Icon icon='fa-phone' style={iconPadding} />
              {this.props.data.displayPhone}
            </ListItem>
            <a href={this.props.data.mobileUrl} target='_blank' style={{ textDecoration: 'none' }}>
              <ListItem tappable>
                <Icon icon='fa-yelp' style={iconPadding}/>
                Visit {this.props.data.displayTitle} on Yelp!
              </ListItem>
            </a>
          </List>
          <BottomNav></BottomNav>
        </Page>
    );
  }
}

const mapStateToProps = state => ({
  data: state.liveData[0],
});

export default connect(mapStateToProps)(Event);
