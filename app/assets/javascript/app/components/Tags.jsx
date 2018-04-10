import React from 'react';


class Tags extends React.Component {

  render() {
    if (Array.isArray(this.props.items) && this.props.items.length > 0) {
      const tags = this.props.items.map(tag => {
        const imgSrc = '/assets/' + ((tag.type === 'user') ? 'users.svg' : 'calendar.svg');
        const classes = ['tag', (tag.type === 'user') ? 'light' : null].join(' ').trim();

        return (
          <span className={classes}>
            <img src={imgSrc} />
            {tag.value}
          </span>
        );
      });

      return (<div className="tags">{tags}</div>);
    }

    return null;
  }

};

export default Tags;
