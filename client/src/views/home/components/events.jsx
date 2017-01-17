import React, { Component } from 'react';
// Redux
import { connect }          from 'react-redux';
// Onsen UI
import { ListItem, List, Icon } from 'react-onsenui';
// Styles
// import { }              from '../../../styles/styles';

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List
        dataSource={this.props.events}
        renderRow={
          (event, idx) => (
            <ListItem key={idx} modifier={idx === this.props.events.length - 1 ? 'longdivider' : null} onClick={() => {
              this.props.handleTouch(event);
            }}>
              <div className="left">
                <img className="list__item__image" src={JSON.parse(event.topEvent)[0].imageUrl} />
              </div>
              <div className="center">
                <span className="list__item__title">{JSON.parse(event.topEvent)[0].displayTitle}</span>
                <span className="list__item__attendees">
                  Attendees <br />
                  {JSON.parse(event.attendees).reduce((memo, attendee) => memo + ' ' + attendee.name, '')}
                </span>
              </div>
            </ListItem>
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Events);


// const Events = ({ handleTouch, events }) => (
//   <List
//     dataSource={events}
//     renderRow={
//       (event, idx) => (
//         <ListItem key={idx} modifier={idx === events.length - 1 ? 'longdivider' : null} onClick={() => {
//           handleTouch(event);
//           console.log(event);
//         }}>
//           <div className="left">
//             <img className="list__item__image" src={JSON.parse(event.topEvent)[0].imageUrl} />
//           </div>
//           <div className="center">
//             <span className="list__item__title">{JSON.parse(event.topEvent)[0].displayTitle}</span>
//             <span className="list__item__attendees">
//               Attendees <br />
//               {JSON.parse(event.attendees).reduce((memo, attendee) => memo + ' ' + attendee.name, '')}
//             </span>
//           </div>
//         </ListItem>
//       )
//     }
//   />
// );

// export default Events;

            // <span className="list__item__subtitle">{JSON.parse(event.topEvent)[0].snippetText}</span>
            // {JSON.parse(event.attendees)[0].name}
