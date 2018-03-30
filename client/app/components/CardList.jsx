import React from 'react';
import PropTypes from 'prop-types';


class CardList extends React.Component {
  
  render() {
    const listContent = this.props.items.map(item => {

      /*
      * Attributes
      */
      const classes = [
        (this.props.type === 'permit') ? 'borderless' : null,
        (!item.active) ? 'inactive' : null,
      ].join(' ').trim();

      const styles = {
        borderColor: item.color,
      };


      /*
      * Children
      */
      const diamond = (() => {
        if (this.props.type === 'permit') {
          return <span className="diamond" style={styles}></span>;
        }
      })();

      const tags = (() => {
        if (Array.isArray(item.tags) && item.tags.length > 0) {
          const _tags = item.tags.map(tag => {
            const imgSrc = '/assets/' + ((tag.type === 'user') ? 'users.svg' : 'calendar.svg');
            const _classes = ['tag', (tag.type === 'user') ? 'light' : null].join(' ').trim();

            return (
              <span className={_classes}>
                <img src={imgSrc} />
                {tag.value}
              </span>
            );
          });

          return (<div className="tags">{_tags}</div>);
        }
      })();

      const editLink = (() => {
        if (this.props.type !== 'permit') {
          return <a href="">Edit</a>;
        }
      })();

      return (
        <li key={item.title} className={classes} style={styles}>
          {diamond}
          {item.title}
          {tags}
          {editLink}
        </li>
      );
    });

    return (
      <ul className="component CardList">
        {listContent}
      </ul>
    );
  }

};

export default CardList;
