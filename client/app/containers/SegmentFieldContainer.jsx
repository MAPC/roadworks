import { connect } from 'react-redux';
import SegmentField from '../components/fields/SegmentField';

import {
  updateSegmentRoad,
  updateSegmentEndPoint,
  updateSegmentEndPointType,
} from '../actions/workingPlanActions';

const mapStateToProps = (state, props) => {
  const segment = state.workingPlan.segments[props.id];
  return {
    roadOptions: Object.keys(state.road.cache).map(id => ({
      value: id,
      label: state.road.cache[id].name,
    })),
    crossStreetOptions: segment.road
        ? segment.crossStreetOptions
        : [],
    segment,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
    onRoadChange: (opt) => dispatch(updateSegmentRoad(props.id, opt.value)),
    onOrigTypeChange: (value) => dispatch(updateSegmentEndPointType(props.id, value, true)),
    onOrigChange: (opt) => dispatch(updateSegmentEndPoint(props.id, opt.value, true)),
    onDestTypeChange: (value) => dispatch(updateSegmentEndPointType(props.id, value, false)),
    onDestChange: (opt) => dispatch(updateSegmentEndPoint(props.id, opt.value, false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentField);
