import React from 'react';
// Onsen UI
import { Toolbar, BackButton } from 'react-onsenui';

/**
 * Place into Onsen Page renderToolbar Attribute
 * @param {Object} props - React props
 * @param {string} props.title - Text to be displayed
 * @param {requestCallback} [props.handleBack] - Callback to route to the previous page
 * @extends {React.Component}
 */
const TopBar = ({ title, handleBack }) => (
  <Toolbar>
    {
      handleBack ?
      <div className="left">
        <BackButton onClick={handleBack}></BackButton>
      </div> :
      <div/>
    }
    <div className='center' style={{ fontWeight: 'bolder' }}>{title}</div>
  </Toolbar>
);

export default TopBar;
