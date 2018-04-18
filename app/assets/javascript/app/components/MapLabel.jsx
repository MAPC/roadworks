import React from 'react';

import Hourglass from './Hourglass';

class MapLabel extends React.Component {

  render() {
    const icon = this.props.type === 'plan'
                ? <Hourglass type="empty" color={this.props.items[0].color} />
                : <img src="/assets/shovel.svg" />;

    const items = this.props.items.map(item => {
      return (
        <li key={`${item.top}-${item.bottom}`}>
          <div className="label-item-top">
            {item.top}
          </div>
          <div className="label-item-bottom" style={{backgroundColor: item.color}}>
            {item.bottom}
          </div>
        </li>
      );
    });

    return (
      <div className="component MapLabel">
        <div className={`icon-wrapper ${this.props.type}`}>{icon}</div>

        <ul className="label-items">
          {items}
        </ul>
      </div>
    );
  }

}

export default MapLabel;
