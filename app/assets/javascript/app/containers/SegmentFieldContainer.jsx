import { connect } from 'react-redux';
import SegmentField from '../components/fields/SegmentField';

import {
  updateSegmentRoad,
  updateSegmentEndPoint,
  updateSegmentEndPointType,
} from '../actions/workingPlanActions';

import capitalize from '../util/capitalize';


const mapStateToProps = (state, props) => {
  const segment = state.workingPlan.segments[props.id];

  return {
    roadOptions: Object.keys(state.road.cache).map(id => ({
      value: id,
      label: capitalize(state.road.cache[id].name),
    })),
    crossStreetOptions: segment.road
        ? segment.crossStreetOptions.map(x => { x.label = capitalize(x.label); return x })
        : [],
    segment,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
    onRoadChange: (opt) => dispatch(updateSegmentRoad(props.id, opt.value)),
    onOrigTypeChange: (value) => dispatch(updateSegmentEndPointType(props.id, !value, true)),
    onOrigChange: (value) => dispatch(updateSegmentEndPoint(props.id, value, true)),
    onDestTypeChange: (value) => dispatch(updateSegmentEndPointType(props.id, !value, false)),
    onDestChange: (value) => dispatch(updateSegmentEndPoint(props.id, value, false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentField);
