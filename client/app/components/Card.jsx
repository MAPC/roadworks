import React from 'react';
import PropTypes from 'prop-types';


class Card extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {collapsed: false}; 

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }


  toggleCollapsed() {
    this.setState({collapsed: !this.state.collapsed});
  }


  render() {
    const toggler = <span className="absolute-center">{this.state.collapsed ? '+' : '-'}</span>;

    return (
      <article className={`component Card ${this.state.collapsed ? 'collapsed' : ''}`}>
        <div className="card-header">
          <h3>{this.props.title}</h3>
          <button onClick={this.toggleCollapsed}>
            {toggler}
          </button>
        </div>

        {this.props.children}
      </article>
    );
  }

};

export default Card;
