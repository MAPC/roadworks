import { connect } from 'react-redux';
import TimeframeField from '../components/fields/TimeframeField';

import {
  timeframeStartChange,
  timeframeEndChange,
  timeframeRemoveSegment,
  timeframeAddSegment,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  const timeframe = state.workingPlan.timeframe[props.index];
  return {
    start: timeframe.start,
    end: timeframe.end,
    segmentIndicies: Array.from(timeframe.segments.keys()),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onTimeframeStartChange: (date) => dispatch(timeframeStartChange(date)),
    onTimeframeEndChange: (date) => dispatch(timeframeEndChange(date)),
    removeSegment: (index) => dispatch(timeframeRemoveSegment(index)),
    addSegment: (index) => dispatch(timeframeAddSegment(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeframeField);
