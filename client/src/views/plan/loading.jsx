import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
import { updateYelpData, updateEventHash }  from '../../redux/actions';


// Axios for requests
import axios            from 'axios';

// Styles
import { }   from '../../styles/styles';

// Import Sockets
import addSockets from './../../sockets/sockets';

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const hash = window.location.pathname.split('/')[2];
    this.props.updateEventHash(hash);
    axios.get(`/events/${hash}`)
        .then((data) => {
          this.props.updateYelpData(JSON.parse(data.data.data));
        })
        .then(() => {
          console.log('After AJAX', this.props.yelpData);
          this.props.router.push('/collaborate');
        });
  }


  render() {
    return (
      <div />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
  updateEventHash: (eventHash) => {
    dispatch(updateEventHash(eventHash));
  },
});

const mapStateToProps = state => ({
  yelpData: state.yelpData,
  eventHash: state.eventHash,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
