import { connect } from 'react-redux';
import SegmentField from '../components/fields/SegmentField';

const mapStateToProps = (state, props) => {
  const segment = state.workingPlan.segments[props.id];
  return {
    roadOptions: Object.keys(state.road.cache).map(id => ({
      value: id,
      label: state.road.cache[id].name,
    })),
    crossStreetOptions: props.segment.road
        ? props.segment.crossStreetOptions
        : [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentField);
