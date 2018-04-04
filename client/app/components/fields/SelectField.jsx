import React from 'react';

class SelectField extends React.Component {

  render() {
    return (
      <div class="component SelectField">
        <select name={this.props.name}>
          {this.props.children}
        </select>
      </div>
    );
  }

}

export default SelectField;
