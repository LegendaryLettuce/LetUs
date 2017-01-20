import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
import { Page, List, ListItem, Icon, Toolbar, BackButton } from 'react-onsenui';
// Styles
import { bodyStyle, listContainer, listStyle, listBottom } from '../../../styles/styles';
// Pages
import  BottomNav       from '../../../views/_global/bottomNav.jsx';

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

class HomeEvent extends Component {
  constructor(props) {
    super(props);
    this.starRating = (rating) => {
      const a = new Array(Math.floor(rating)).fill(0);
      if (rating - Math.floor(rating) !== 0) {
        a.push(1);
      }
      return a;
    };

    this.getUrl = url => (url.replace('ms.jpg', 'l.jpg'));
    this.handleBack = this.handleBack.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  handleBack() {
    this.props.router.push(this.props.parentPage);
  }

  renderToolbar(toolbarTitle) {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={this.handleBack}></BackButton>
        </div>
        <div className='center' style={{ fontWeight: 'bolder' }}>{toolbarTitle}</div>
      </Toolbar>
    );
  }

  render() {
    return (
        <Page className="scroller" modifier='shop-details' renderToolbar={() => this.renderToolbar('Event Details')}
        style={{ background: 'rgba(51,51,51,1)' }}>
        <div style={listContainer}>
          <div style={listStyle}>
              <div style={{
                ...imageDiv,
                backgroundImage: `url(${this.getUrl(this.props.data.imageUrl)})`,
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
                <a href={`tel:${this.props.data.displayPhone}`} target='_blank' style={{ textDecoration: 'none' }}>
                  <ListItem tappable><Icon icon='fa-phone' style={iconPadding} />
                    {this.props.data.displayPhone}
                  </ListItem>
                </a>
                <a href={this.props.data.mobileUrl} target='_blank' style={{ textDecoration: 'none' }}>
                  <ListItem tappable>
                    <Icon icon='fa-yelp' style={iconPadding}/>
                    Visit {this.props.data.displayTitle} on Yelp!
                  </ListItem>
                </a>
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

const mapStateToProps = state => ({
  data: JSON.parse(state.homeEventPageData.topEvent)[0],
  parentPage: state.parentPage,
});

export default connect(mapStateToProps)(HomeEvent);
