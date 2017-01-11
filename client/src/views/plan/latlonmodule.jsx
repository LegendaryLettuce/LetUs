import React, { Component }           from 'react';
// Redux
import { connect }                    from 'react-redux';
import { Page, Button, Input } from 'react-onsenui';
// Packages
import Autocomplete                   from 'react-google-autocomplete';
// import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import axios                          from 'axios';
// Styles
import { bodyStyle }                  from '../../styles/styles';
import '../../styles/mapStyle.css';
// Pages
// import  BottomNav                     from './../../views/_global/bottomNav.jsx';
const inputField = {
  ...bodyStyle,
};

const title = {
  ...bodyStyle,
  fontSize: 'xx-large',
  textAlign: 'center',
};

const searchForm = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};


class LatLonModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.getInput = (e) => {
      this.setState({ input: e.target.value });
    };
    this.handleSelect = (address) => {
      this.setState({
        address,
        loading: true,
      });
    };
    this.handleChange = (address) => {
      this.setState({
        address,
        geocodeResults: null,
      });
    };
  }

  componentDidMount() {
    const target = document.getElementsByTagName('body')[0];
    const config = { childList: true };

    const childObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          node.classList.add('needsclick');
          node.childNodes.forEach((child) => {
            child.classList.add('needsclick');
          });
        });
      });
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if ([...node.classList].indexOf('pac-container') !== -1) {
            childObserver.observe(node, config);
          }
        });
      });
    });
    observer.observe(target, config);
  }

  componentWillUnmount() {
    observer.disconnect();
  }

  render() {

    return (
      <Page>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places"/>
        <p style={title}>Where do you wanna go?</p>
        <div className='HERPDERP'>
          <div style={searchForm}>
            <Autocomplete
              style={inputField}
              onPlaceSelected={(place) => {
                console.log(place.geometry.location.lat(), place.geometry.location.lng());
              }}
              types={['geocode']}
              componentRestrictions={{ country: 'us' }}
            />
            <Button onClick={console.log(this.state.input)}>Submit</Button>
          </div>
        </div>

      {/* <PlacesAutocomplete
        style={inputField}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        autocompleteItem={AutocompleteItem}
       /> */}

      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(LatLonModule);
