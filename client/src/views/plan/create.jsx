import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Page, Toolbar, List, ListItem, Button } from 'react-onsenui';
// Styles
import styles           from '../../styles/styles';

class Create extends Component {

  constructor(props) {
    super(props);
  }

  // Example Code from Docs for Row Generation
  // renderRow(row, index) {
  //   return (
  //     <ListItem key={index}>
  //       <div className='left'>
  //         <img src={`http://placekitten.com/g/${x}/${y}`} className='list__item__thumbnail' />
  //       </div>
  //       <div className='center'>
  //         {name}
  //       </div>
  //     </ListItem>
  //   );
  // }

  renderRow(row, index) {
    const x = 40 + Math.round(5 * (Math.random() - 0.5)),
          y = 40 + Math.round(5 * (Math.random() - 0.5));

    const names = ['Max', 'Chloe', 'Bella', 'Oliver', 'Tiger', 'Lucy', 'Shadow', 'Angel'];
    const name = names[Math.floor(names.length * Math.random())];

    return (
      <ListItem key={index} modifier='longdivider' tappable>
        <div className='left'>
          <img src={`http://placekitten.com/g/${x}/${y}`} className='list__item__thumbnail' />
        </div>
        <label className='center'>
          {name}
        </label>
      </ListItem>
    );
  }

  // On Click Event
  decideTogether() {
    console.log('Deciding Together');
  }

  render() {
    return (
      <Page>
        <List
          dataSource={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderRow={this.renderRow}
        />
      </Page>

    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Create);

        // <Toolbar>
        //   <div className='center'>List</div>
        // </Toolbar>
// <Button 
//           style={{ padding: '0px 40px 0px 40px' }}
//           onClick={this.decideTogether}
//           modifier='large'
//         >Decide Together</Button>

          // renderRow={(row, i) => <ListItem tappable tapBackgroundColor={'#d9d9d9'} key={i}><div className='center'>{row}</div></ListItem>}
