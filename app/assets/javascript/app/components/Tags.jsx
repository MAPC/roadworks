import React from 'react';


class Tags extends React.Component {

  render() {
    if (Array.isArray(this.props.items) && this.props.items.length > 0) {
      const tags = this.props.items.map(tag => {
        const imgSrc = `/assets/${(tag.type === 'user') ? 'users.svg' : 'calendar.svg'}`;
        const classes = ['tag', (tag.type === 'user') ? 'light' : null].join(' ').trim();

        return (
          <li key={tag.value} className={classes}>
            <img src={imgSrc} />
            {tag.value}
          </li>
        );
      });

      return (<ul className="component Tags">{tags}</ul>);
    }

    return null;
  }

};

export default Tags;
