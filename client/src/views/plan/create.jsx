import React, { Component }       from 'react';
// Onsen UI
import ons              from 'onsenui';
import { Page, Toolbar, List, ListItem, Button, BackButton } from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { updateYelpData } from '../../redux/actions';
// Styles
import styles           from '../../styles/styles';
// Subcomponents
import GenericList from './create/genericList.jsx';
// Import sampleData
import eatData from './create/sampleData/eatData';
import drinkData from './create/sampleData/drinkData';
import playData from './create/sampleData/playData';

const iconSize = '80px';

const containerPadding = '1%';

const icons = color => ({
  paddingTop: '.4em',
  paddingBottom: '.4em',
  // eslint-disable-next-line no-nested-ternary
  background: (!color) ?        'radial-gradient(#1ee, #5ff, #8ff)' :
              (color === 1) ?   'radial-gradient(#e1e, #f5f, #f8f)' :
                                'radial-gradient(#ee1, #ff5, #ff8)',
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
  fontSize: '400%',
  fontWeight: 'bolder',
};

const eatContainer = {
  paddingTop: containerPadding,
  paddingBottom: containerPadding,
};

const drinkContainer = {
  paddingTop: containerPadding,
  paddingBottom: containerPadding,
};

const playContainer = {
  paddingTop: containerPadding,
  paddingBottom: containerPadding,
};

const createData = [{ displayTitle: 'Eat', useIcon: eatIcon, textStyle: textStyleCreate, containerStyle: eatContainer },
                    { displayTitle: 'Drink', useIcon: drinkIcon, textStyle: textStyleCreate, containerStyle: drinkContainer },
                    { displayTitle: 'Play', useIcon: playIcon, textStyle: textStyleCreate, containerStyle: playContainer }];

const categoryLabels = ['Create', 'Food', 'Beverage', 'Entertainment'];

class Create extends Component {


  constructor(props) {
    super(props);
    this.props.updateYelpData(createData);
    // this.props.yelpData; use this to pull from redux
    this.state = {
      selectedView: 'Create',
      selectedIndex: 0,
      data: [createData, eatData, drinkData, playData],
    };
    this.decideTogether = this.decideTogether.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.parseUniqueCategories = this.parseUniqueCategories.bind(this);
    this.parseBizByCategory = this.parseBizByCategory.bind(this);
  }

  handleTouch(item) {
    if (this.state.selectedView === 'Create') {
      const indexSelected = createData.indexOf(item) + 1;

      this.setState({
        selectedView: `${categoryLabels[indexSelected]} Categories`,
        selectedIndex: indexSelected,
      }, () => {
        this.props.updateYelpData(this.parseUniqueCategories(this.state.data[indexSelected]));
      });
    } else if (this.state.selectedView.split(' ')[1] === 'Categories') {
      this.setState({
        selectedView: item.displayTitle,
      }, () => {
        this.props.updateYelpData(
          this.parseBizByCategory(this.state.data[this.state.selectedIndex]),
        );
      });
    }
  }

  handleBack() {
    const selected = this.state.selectedView;
    if (selected !== 'Create') {
      if (selected.split(' ')[1] === 'Categories') {
        this.setState({
          selectedView: 'Create',
          selectedIndex: 0,
        }, () => {
          this.props.updateYelpData(this.state.data[this.state.selectedIndex]);
        });
      } else {
        this.setState({
          selectedView: `${categoryLabels[this.state.selectedIndex]} Categories`,
        }, () => {
          this.props.updateYelpData(
            this.parseUniqueCategories(this.state.data[this.state.selectedIndex]),
          );
        });
      }
    }
  }

  // parses only yelp api
  parseUniqueCategories(dataSet) {
    return dataSet.businesses.reduce((accum, business) => {
      business.categories.forEach((item) => {
        if (!(accum.findIndex(ele => ele.displayTitle === item[0]) + 1)) {
          const newObject = {};
          newObject.displayTitle = item[0];
          newObject.imageUrl = business.image_url;
          accum.push(newObject);
        }
      });
      return accum;
    }, []);
  }

  parseBizByCategory(dataSet) {
    return dataSet.businesses.reduce((accum, business) => {
      const validBiz = business.categories.reduce((accum2, category) => {
        if (category[0] === this.state.selectedView) {
          return true;
        }
        return accum2;
      }, false);
      if (validBiz) {
        const newObject = {};
        newObject.displayTitle = business.name;
        newObject.imageUrl = business.image_url;
        newObject.rating = business.rating;
        accum.push(newObject);
      }
      return accum;
    }, []);
  }

  // On Click Event
  decideTogether() {
    this.props.router.push('/plan/invite');
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
    const buttonStyle = {
      padding: '0px 20px 0px 20px',
      position: 'fixed',
      bottom: '0',
      height: '5%',
      marginBottom: '2%',
      zIndex: '5',
      marginLeft: '25%',
      width: '50%',
      textAlign: 'center',
      fontWeight: 'bold',
    };

    const padStyle = {
      height: '8%',
    };

    return (
      <div>
        <Page
          renderToolbar={() => this.renderToolbar(this.state.selectedView)}
          style={{ background: 'rgba(51,51,51,1)' }}
        >
          <GenericList
            data={this.props.yelpData}
            handleTouch={this.handleTouch}
            selectedView={this.state.selectedView}
          />
          <div style={padStyle}/>
        </Page>
        <Button
          className='center'
          style={buttonStyle}
          onClick={this.decideTogether}
        >
          Decide Together
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
});

const mapStateToProps = state => ({
  yelpData: state.yelpData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
