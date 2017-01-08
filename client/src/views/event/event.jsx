import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
// Onsen UI
import ons                      from 'onsenui';
import { Page, List, ListItem, Icon, Toolbar } from 'react-onsenui';
// Styles
import { bodyStyle }            from '../../styles/styles';

import  BottomNav        from './../../views/_global/bottomNav.jsx';

const dummyData = {
  rating: 4.5,
  snippet_text: 'This place does Korean - Mexican fusion so well! The prices are also super fair for San Francisco. \n\nMy friends and I were about to get two The Big...',
  mobile_url: 'https://m.yelp.com/biz/tacorea-san-francisco?adjust_creative=e6iE0U7lMHSSLdMk1-vrXw&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=e6iE0U7lMHSSLdMk1-vrXw',
  rating_img_url: 'https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
  name: 'Tacorea',
  image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/7sOn8_P7Hxb0ZkM55tz3mg/l.jpg',
  rating_img_url_small: 'https://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
  url: 'https://www.yelp.com/biz/tacorea-san-francisco?adjust_creative=e6iE0U7lMHSSLdMk1-vrXw&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=e6iE0U7lMHSSLdMk1-vrXw',
  phone: '4158851325',
  display_phone: '+1-415-885-1325',
  location: {
    cross_streets: 'Taylor St & Mason St',
    city: 'San Francisco',
    display_address: [
      '809 Bush St',
      'Union Square',
      'San Francisco, CA 94108',
    ],
  },
  categories: [
    [
      'Mexican',
      'mexican',
    ],
    [
      'Korean',
      'korean',
    ],
    [
      'Latin American',
      'latin',
    ],
  ],
};

const iconPadding = {
  marginRight: '10px',
};

const imageDiv = {
  ...bodyStyle,
  background: `url(${dummyData.image_url})`,
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
  }

  starRating(rating) {
    const a = new Array(Math.floor(rating)).fill(0);
    if (rating - Math.floor(rating) !== 0) {
      a.push(1);
    }
    return a;
  }

  renderToolbar(toolbarTitle) {
    return (
      <Toolbar>
        <div className='center' style={{ fontWeight: 'bolder' }}>{toolbarTitle}</div>
      </Toolbar>
    );
  }

  // router
  // decideCreate() {
  //   this.props.router.push('/create');
  // }

  render() {
    return (
        <Page modifier='shop-details' renderToolbar={() => this.renderToolbar('Event Details')}
        style={{ background: 'rgba(51,51,51,1)' }}>
          <div style={imageDiv}>
            <div style={imageTint}>
              <div style={titleText}>
                <span style={eventTitle}>{dummyData.name}</span><br/>
                <p style={tagline}>{dummyData.snippet_text}</p>
                <div>
                  {this.starRating(dummyData.rating).map((e,i) => (
                    <Icon icon={`fa-star${e ? '-half' : ''}`} fixed-width='false' key={i}></Icon>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {dummyData.categories.map((cat, i) => (
              <div style={tags} key={i}>{cat[0]}</div>
            ))}
          </div>
          <List>
            <a href={`http://maps.google.com/?q=${dummyData.location.display_address.join(', ')}`} target='_blank' style={{ textDecoration: 'none' }}>
              <ListItem tappable>
                <Icon icon='fa-map-marker' style={iconPadding}/>
                {dummyData.location.display_address.join(', ')}
              </ListItem>
            </a>
            <ListItem tappable><Icon icon='fa-phone' style={iconPadding} />
              {dummyData.display_phone}
            </ListItem>
            <a href={dummyData.mobile_url} target='_blank' style={{ textDecoration: 'none' }}>
              <ListItem tappable>
                <Icon icon='fa-yelp' style={iconPadding} />Visit {dummyData.name} on Yelp!
              </ListItem>
            </a>
          </List>
          <BottomNav></BottomNav>
        </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Event);
