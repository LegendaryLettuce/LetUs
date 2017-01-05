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

class Create extends Component {

  constructor(props) {
    super(props);
    this.decideTogether = this.decideTogether.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar>
          <div className='center'>Create</div>
      </Toolbar>
    );
  }

  renderRow(row, index) {
    // Randomly Select a Cat picture
    const x = 40 + Math.round(5 * (Math.random() - 0.5)),
          y = 40 + Math.round(5 * (Math.random() - 0.5));

    return (
      <ListItem key={index} modifier='longdivider' tappable>
        <div className='left'>
          <img src={`http://placekitten.com/g/${x}/${y}`} className='list__item__thumbnail' />
        </div>
        <div className='center'>
          {row}
        </div>
      </ListItem>
    );
  }

  // On Click Event
  decideTogether() {
    console.log('Deciding Together this:');
    this.props.router.push('/plan/invite');
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <List
          dataSource={['Eatz', 'Drinkz', 'Playz']}
          renderRow={this.renderRow}
        />
        <Button
          className='center'
          style={{ padding: '0px 40px 0px 40px' , position: 'absolute', bottom: '0', marginBottom: '5%'}}
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
