import React, { Component } from 'react';
// Onsen UI
import ons              from 'onsenui/js/onsenui.min';
import { Page, Button } from 'react-onsenui';
// Axios for requests
import axios            from 'axios';
// Redux
import { connect }      from 'react-redux';
import {
  updateYelpData,
  updateEventHash,
  updateParentPage,
  updateEventPage,
  updateSelectedView,
  updateSelectedViewIndex,
  load,
}                       from '../../redux/actions';
// Utils
import { getStore }     from '../../utils/utils';
// Styles
import { buttonStyle }  from './../../styles/styles';
// Subcomponents
import TopBar           from './../../views/_global/topBar.jsx';
import GenericList      from './../../views/_global/genericList.jsx';
import BottomNav        from './../../views/_global/bottomNav.jsx';

const osCheck = !ons.platform.isAndroid();

const iconSize = '50px';

const containerPadding = osCheck ? '9%' : '0';

const icons = color => ({
  paddingTop: '.4em',
  paddingBottom: '.4em',
  // eslint-disable-next-line no-nested-ternary
  background: (!color) ?        '#E26A6A' :
              (color === 1) ?   '#67809F' :
                                '#F4B350',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
});

const eatIcon = {
  icon: 'fa-cutlery',
  size: iconSize,
  style: icons(0),
};

const drinkIcon = {
  icon: 'fa-glass',
  size: iconSize,
  style: icons(1),
};

const playIcon = {
  icon: 'fa-smile-o',
  size: iconSize,
  style: icons(2),
};

const textStyleCreate = {
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontSize: '400%',
};

const edpContainer = {
  paddingTop: containerPadding,
  paddingBottom: containerPadding,
};

const createData = [{ displayTitle: 'Eat', useIcon: eatIcon, textStyle: textStyleCreate, containerStyle: edpContainer },
                    { displayTitle: 'Drink', useIcon: drinkIcon, textStyle: textStyleCreate, containerStyle: edpContainer },
                    { displayTitle: 'Play', useIcon: playIcon, textStyle: textStyleCreate, containerStyle: edpContainer }];

const categoryLabels = ['Create', 'Food', 'Beverage', 'Entertainment'];

const padStyle = {
  height: '86px',
};

class Create extends Component {
  constructor(props) {
    super(props);
    if (this.props.selectedView === 'Create') {
      this.props.updateYelpData(createData);
    }
    this.state = {
      data: [createData, this.props.edp.eat, this.props.edp.drink, this.props.edp.play],
      buttonDisplay: this.props.selectedView === 'Create' ? 'none' : 'block',
    };
    this.handleTouch = this.handleTouch.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.parseUniqueCategories = this.parseUniqueCategories.bind(this);
    this.parseBizByCategory = this.parseBizByCategory.bind(this);
    this.createEventHash = this.createEventHash.bind(this);
    this.props.updateParentPage('/create');
  }

  componentWillMount() {
    // Load cached redux from Session Store
    if (!this.props.loaded) this.props.load(getStore());
  }

  handleTouch(item) {
    if (this.props.selectedView === 'Create') {
      const indexSelected = createData.indexOf(item) + 1;
      this.props.updateSelectedView(`${categoryLabels[indexSelected]} Categories`);
      this.props.updateSelectedViewIndex(indexSelected);
      this.props.updateYelpData(this.parseUniqueCategories(this.state.data[indexSelected]));
      this.setState({
        buttonDisplay: 'none',
      });
    } else if (this.props.selectedView.split(' ')[1] === 'Categories') {
      this.props.updateSelectedView(item.displayTitle);
      this.props.updateYelpData(
        this.parseBizByCategory(this.state.data[this.props.selectedViewIndex], item.displayTitle),
      );
      this.setState({
        buttonDisplay: 'block',
      });
    } else {
      this.props.updateEventPage(item);
      this.props.router.push('/event');
    }
  }

  handleBack() {
    if (this.props.selectedView !== 'Create') {
      if (this.props.selectedView.split(' ')[1] === 'Categories') {
        this.props.updateSelectedView('Create');
        this.props.updateSelectedViewIndex(0);
        this.props.updateYelpData(this.state.data[0]);
      } else {
        this.props.updateSelectedView(`${categoryLabels[this.props.selectedViewIndex]} Categories`);
        this.props.updateYelpData(
          this.parseUniqueCategories(this.state.data[this.props.selectedViewIndex]),
        );
        this.setState({
          buttonDisplay: 'none',
        });
      }
    } else {
      this.props.router.push('/search');
    }
  }

  // parses only yelp api
  parseUniqueCategories(dataSet) {
    return dataSet.businesses.reduce((accum, business) => {
      business.categories.forEach((item) => {
        if (!(accum.findIndex(ele => ele.displayTitle === item[0]) + 1)) {
          const newObject = {
            displayTitle: item[0],
            imageUrl: business.image_url,
          };
          accum.push(newObject);
        }
      });
      return accum;
    }, []);
  }

  parseBizByCategory(dataSet, selectedCategory) {
    return dataSet.businesses.reduce((accum, business) => {
      const validBiz = business.categories.reduce((accum2, category) => {
        if (category[0] === selectedCategory) {
          return true;
        }
        return accum2;
      }, false);
      if (validBiz) {
        const newObject = {
          displayTitle: business.name,
          imageUrl: business.image_url,
          rating: business.rating,
          categories: business.categories,
          displayAddress: business.location.display_address,
          displayPhone: business.display_phone,
          snippetText: business.snippet_text,
          mobileUrl: business.mobile_url,
          votes: 0,
          preference: -1,
          intensity: 0,
        };
        accum.push(newObject);
      }
      return accum;
    }, []);
  }

  createEventHash() {
    axios.post('/events/', {
      creator: JSON.stringify({ name: this.props.user.name, id: this.props.user.id }),
      data: JSON.stringify(this.props.yelpData),
      checkIns: [true],
      linkHash: '',
    })
      .then((res) => {
        console.log('Saved invited friends', res);
        this.props.updateEventHash(res.data.linkHash);
        console.log('EVENT HASH', this.props.eventHash);
        this.props.router.push('/invite');
      })
      .catch((error) => {
        console.log('Inviting friends error', error);
      });
  }

  render() {
    return (
      <div>
        <Page
          renderToolbar={TopBar.bind(this, { title: 'Location', handleBack: this.handleBack })}
          style={{ background: 'rgba(51,51,51,1)' }}
        >
          <GenericList
            data={this.props.yelpData}
            handleTouch={this.handleTouch}
            selectedView={this.props.selectedView}
          />
          <div style={padStyle}/>
        </Page>
        <Button
          style={{
            ...buttonStyle,
            display: this.state.buttonDisplay,
          }}
          modifier='large'
          onClick={this.createEventHash}
        >Decide Together</Button>
        <BottomNav router={this.props.router}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  load: (state) => {
    dispatch(load(state));
  },
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
  updateEventHash: (eventHash) => {
    dispatch(updateEventHash(eventHash));
  },
  updateParentPage: (parentPage) => {
    dispatch(updateParentPage(parentPage));
  },
  updateEventPage: (eventPageData) => {
    dispatch(updateEventPage(eventPageData));
  },
  updateSelectedView: (selectedView) => {
    dispatch(updateSelectedView(selectedView));
  },
  updateSelectedViewIndex: (selectedViewIndex) => {
    dispatch(updateSelectedViewIndex(selectedViewIndex));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  yelpData: state.yelpData,
  eventHash: state.eventHash,
  user: state.user,
  edp: state.edp,
  selectedView: state.selectedView,
  selectedViewIndex: state.selectedViewIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
