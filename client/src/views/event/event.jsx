import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
// Onsen UI
import ons                      from 'onsenui';
import { Page, List, ListItem, Icon, Dialog } from 'react-onsenui';
// Styles
import { bodyStyle, Tint }            from '../../styles/styles';

const dummyData = {
  rating: 4.5,
  'snippet_text': 'This place does Korean - Mexican fusion so well! The prices are also super fair for San Francisco. \n\nMy friends and I were about to get two The Big...',
  mobile_url: 'https://m.yelp.com/biz/tacorea-san-francisco?adjust_creative=e6iE0U7lMHSSLdMk1-vrXw&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=e6iE0U7lMHSSLdMk1-vrXw',
  rating_img_url: 'https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
  name: 'Tacorea',
  'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/7sOn8_P7Hxb0ZkM55tz3mg/l.jpg',
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
      'San Francisco, CA 94108'
    ],
  },
};

const iconPadding = {
  marginRight: '10px',
};

const imageDiv = {
  ...bodyStyle,
  background: `url(${dummyData.image_url})`,
  height: '250px',
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
  height: '250px',
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


  // router
  // decideCreate() {
  //   this.props.router.push('/create');
  // }

  render() {
    return (
        <Page modifier='shop-details'>
          <div style={imageDiv}>
            <div style={imageTint}>
              <div style={titleText}>
                <span style={eventTitle}>{dummyData.name}</span><br/>
                <p style={tagline}>{dummyData.snippet_text}</p>
                <div>
                  {this.starRating(dummyData.rating).map(e => (
                    <Icon icon={`fa-star${e ? '-half' : ''}`} fixed-width='false'></Icon>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <List>
            <ListItem tappable><span><Icon icon='fa-map-marker' style={iconPadding}/></span><span>{dummyData.location.display_address.join(', ')}</span></ListItem>
            <ListItem tappable><Icon icon='fa-phone' style={iconPadding} />{dummyData.display_phone}</ListItem>
            <ListItem tappable><Icon icon='fa-phone' style={iconPadding} />Yelp Page</ListItem>
          </List>
        </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Event);
