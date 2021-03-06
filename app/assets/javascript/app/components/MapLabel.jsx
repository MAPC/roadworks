import React from 'react';

import Hourglass from './Hourglass';
import constants from '../constants/constants';

class MapLabel extends React.Component {

  render() {
    const icon = (() => {
      if (this.props.type === 'plan') {
        let hourglassType = 'empty';
        const dataYear = parseInt(this.props.items[0].top);
        const currentYear = parseInt((new Date()).getUTCFullYear());
        const diff = Math.abs(dataYear - currentYear);

        if (diff >= constants.MAP.LABELS.HOURGLASS_YEARS.FULL) {
          hourglassType = 'full';
        }
        else if (diff >= constants.MAP.LABELS.HOURGLASS_YEARS.HALF) {
          hourglassType = 'half';
        }

        return (<Hourglass type={hourglassType} color={this.props.items[0].color} />);
      }
      else {
        return (<img src="/assets/shovel.svg" />);
      }
    })();

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

    const classNames = this.props.markersHidden
        ? "component MapLabel hidden"
        : "component MapLabel";

    return (
      <div
        className={classNames}
        onClick={this.props.markersHidden ? null : this.props.onClick}
      >
        <div className={`icon-wrapper ${this.props.type}`}>{icon}</div>

        <ul className="label-items">
          {items}
        </ul>
      </div>
    );
  }

}

export default MapLabel;
