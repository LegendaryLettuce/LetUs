import React, { Component } from 'react';
// Onsen UI
import { ListItem, List } from 'react-onsenui';

const Events = props => (
      <List
        dataSource={props.events}
        renderRow={
          (event, idx) => (
            <ListItem key={idx} modifier={idx === props.events.length - 1 ? 'longdivider' : null} onClick={() => {
              props.handleTouch(event);
            }}>
              <div className="left">
                <img className="list__item__image" alt="Top Event Image" src={JSON.parse(event.topEvent)[0].imageUrl} />
              </div>
              <div className="center">
                <span className="list__item__title">{JSON.parse(event.topEvent)[0].displayTitle}</span>
                {/* <span className="list__item__subtitle">
                  <b>Event LORD</b> <br />
                  {JSON.parse(event.creator).name}
                </span> */}
                <span className="list__item__subtitle">
                  Attendees <br /> {JSON.parse(event.creator).name}
                  {JSON.parse(event.attendees).reduce((memo, attendee) => `${memo} ${attendee.name}`, '')}
                </span>
              </div>
            </ListItem>
          )
        }
      />
    );

export default Events;
