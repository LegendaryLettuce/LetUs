import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Page, Toolbar, List, ListItem, Button } from 'react-onsenui';
// Styles
import styles           from '../../styles/styles';
// React Router
import { browserHistory, Link } from 'react-router';
// Subcomponents
import GenericList from './create/genericList.jsx';
// Import sampleData
import eatData from './create/sampleData/eatData.js';
import drinkData from './create/sampleData/drinkData.js';
import playData from './create/sampleData/playData.js';

const createData = ['Eat', 'Drink', 'Play'];

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedView: 'Create',
      data: [createData, eatData, drinkData, playData],
      selectedData: createData,
    };
    this.decideTogether = this.decideTogether.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.parseUniqueCategories = this.parseUniqueCategories.bind(this);
  }

  handleTouch(item) {
    if (this.state.selectedView !== 'Categories') {
      const indexSelected = createData.indexOf(item) + 1;

      this.setState({
        selectedView: 'Categories',
        selectedData: this.parseUniqueCategories(this.state.data[indexSelected]),
      });
    }
  }

  // parses only yelp api
  parseUniqueCategories(dataSet) {
    return dataSet.businesses.reduce((accum, business) => {
      business.categories.forEach((item) => {
        if (!(accum.indexOf(item[0]) + 1)) accum.push(item[0]);
      });
      return accum;
    }, []);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Create</div>
      </Toolbar>
    );
  }

  // On Click Event
  decideTogether() {
    this.props.router.push('/plan/invite');
  }

  // On Click Event
  decideTogether() {
    console.log('Deciding Together');
  }

  render() {

    const buttonStyle = {
      padding: '0px 40px 0px 40px',
      position: 'fixed',
      bottom: '0',
      height: '5%',
      marginBottom: '0%',
    };

    const padStyle = {
      height: '6%',
    }

    return (
      <Page renderToolbar={this.renderToolbar}>
        <GenericList data={this.state.selectedData} handleTouch={this.handleTouch}/>
        <div style={padStyle}></div>
        <Button
          className='center'
          style={buttonStyle}
          onClick={this.decideTogether}
          modifier='large'
        >Decide Together</Button>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Create);
