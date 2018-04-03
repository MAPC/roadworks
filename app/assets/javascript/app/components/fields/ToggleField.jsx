import PropTypes from 'prop-types';
import React from 'react';

import ToggleButton from 'react-toggle-button';

const toggleStyles = {
  reactToggle: {
    display: 'flex',
    width: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    WebkitTapHighlightColor: 'transparent',
  },
  thumbStyle: {
    width: '18px',
    height: '28px',
    display: 'flex',
    alignSelf: 'center',
    boxShadow: '0 0 0 14px rgba(0,0,0,0.3)',
    borderRadius: '50%',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
  },
  trackStyle: {
    width: 300,
    height: 60,
    padding: 0,
    borderRadius: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class ToggleField extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      labelStyles: {
        fontSize: 12,
        width: '100%',
      },
    };
  }

  render() {
    return (
      <ToggleButton
        activeLabel={'Address'}
        inactiveLabel={'Cross Street'}
        value={this.props.value}
        onToggle={this.props.onChange}
        thumbStyle={{
          width: 22,
          height: 22,
          borderRadius: 12,
        }}
        trackStyle={{
          height: 24,
          width: 128,
          borderRadius: 12,
        }}
        activeLabelStyle={this.styles.labelStyles}
        inactiveLabelStyle={this.styles.labelStyles}
      />
    );
  }
}

ToggleField.propTypes = {
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ToggleField;
