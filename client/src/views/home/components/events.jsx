import React from 'react';
// Onsen UI
import { ListItem, List, Icon } from 'react-onsenui';
// Styles
// import { }              from '../../../styles/styles';

const Events = ({ events }) => (
  <List
    dataSource={events}
    renderRow={
      (event, idx) => (
        <ListItem key={idx} modifier={idx === events.length - 1 ? 'longdivider' : null}>
        <div>
          {console.log(JSON.parse(event.topEvent))}
        </div>
          <div className="left">
            <img className="list__item__image" src={JSON.parse(event.topEvent)[0].imageUrl} />
          </div>
          <div className="center">
            <span className="list__item__title">{JSON.parse(event.topEvent)[0].displayTitle}</span>
            <span className="list__item__subtitle">{JSON.parse(event.topEvent)[0].snippetText}</span>
          </div>

        </ListItem>
      )
    }
  />
);

export default Events;

            // console.log(JSON.parse(event.topEvent)[idx].imageUrl)