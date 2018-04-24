import React from 'react';
import PropTypes from 'prop-types';

import CardRowPermitType from './CardRowPermitType';
import CardRowPlan from './CardRowPlan';
import CardRowDetail from './CardRowDetail';

import enums from '../constants/enums';

class Card extends React.Component {

  render() {
    const toggler = <span className="absolute-center">{this.props.collapsed ? '+' : '-'}</span>;
    const listContent = this.props.items.map(item => {
      switch (item.type) {
        case enums.CARD_ROW.TYPES.PERMIT_TYPE:
          return (
            <CardRowPermitType
              key={item.id}
              title={item.title}
              color={item.color}
              active={item.active}
              onClick={() => this.props.itemOnClick(item.id)}
            />
          );
        case enums.CARD_ROW.TYPES.PLAN:
          return (
            <CardRowPlan
              key={item.id}
              title={item.title}
              color={item.color}
              active={item.active}
              onClick={() => this.props.itemOnClick(item.id)}
              editable={item.editable}
              onEdit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                return this.props.itemOnEditClick(item.id);
              }}
            />
          );
        case enums.CARD_ROW.TYPES.DETAIL:
          return (
            <CardRowDetail
              key={item.id}
              label={item.label}
              value={item.value}
            />
          );
      }
    });
    return (
      <article className={`component Card ${this.props.collapsed ? 'collapsed' : ''}`}>
        <div className="card-header">
          <h3>{this.props.title}</h3>
          <button onClick={this.props.onClick}>
            {toggler}
          </button>
        </div>
        <ul className="card-items">
          {listContent.length ? listContent : (
            <li className="placeholder">{this.props.placeholder}</li>
          )}
        </ul>
      </article>
    );
  }

};

export default Card;
