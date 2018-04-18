import React from 'react';

import Hourglass from './Hourglass';

class MapLabel extends React.Component {

  render() {
    return (
      <div className="component MapLabel">
        <Hourglass type="empty" color={this.props.items[0].color} />
      </div>
    );
  }

}

export default MapLabel;
