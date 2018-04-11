import { connect } from 'react-redux';
import SegmentField from '../components/fields/SegmentField';

import {
  updateSegmentRoad,
  updateSegmentEndPoint,
  updateSegmentEndPointType,
  timeframeSegmentRemove,
} from '../actions/workingPlanActions';

import capitalize from '../util/capitalize';


const mapStateToProps = (state, props) => {
  const segment = state.workingPlan.timeframes[props.timeframeIndex].segments[props.index];

  return {
    roadOptions: Object.keys(state.road.cache).map(id => ({
      value: id,
      label: capitalize(state.road.cache[id].name),
    })),
    crossStreetOptions: segment.road_id
        ? segment.crossStreetOptions.map(x => { x.label = capitalize(x.label); return x })
        : [],
    segment,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
    onRoadChange: (opt) => dispatch(updateSegmentRoad(
        props.timeframeIndex, props.index, opt.value)),
    onOrigTypeChange: (value) => dispatch(updateSegmentEndPointType(
        props.timeframeIndex, props.index, !value, true)),
    onOrigChange: (value) => dispatch(updateSegmentEndPoint(
        props.timeframeIndex, props.index, value, true)),
    onDestTypeChange: (value) => dispatch(updateSegmentEndPointType(
        props.timeframeIndex, props.index, !value, false)),
    onDestChange: (value) => dispatch(updateSegmentEndPoint(
        props.timeframeIndex, props.index, value, false)),
    removeSegment: () =>
        dispatch(timeframeSegmentRemove(props.timeframeIndex, props.index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentField);
