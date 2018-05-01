import { connect } from 'react-redux';
import TimeframeField from '../components/fields/TimeframeField';

import {
  timeframeStartChange,
  timeframeEndChange,
  timeframeSegmentRemove,
  timeframeSegmentAdd,
  planTimeframeRemove,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  const timeframe = state.workingPlan.timeframes[props.index];
  return {
    start: timeframe.start,
    end: timeframe.end,
    segmentIndicies: timeframe.segments.reduce((arr, sg, idx) =>
      sg._destroy ? arr : arr.concat([idx])
    , []),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onTimeframeStartChange: (date) =>
        dispatch(timeframeStartChange(props.index, date)),
    onTimeframeEndChange: (date) =>
        dispatch(timeframeEndChange(props.index, date)),
    addSegment: () => dispatch(timeframeSegmentAdd(props.index)),
    removeTimeframe: () => dispatch(planTimeframeRemove(props.index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeframeField);
