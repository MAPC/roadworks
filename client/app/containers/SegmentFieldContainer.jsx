import { connect } from 'react-redux';
import SegmentField from '../components/fields/SegmentField';

const mapStateToProps = (state, props) => {
  return {
    roadOptions: state.road.cityIndex.map(id => ({
      value: id,
      label: state.road.cache[id].name,
    })),
    crossStreetOptions: props.value.road
        ? state.road.cache[props.value.road].cross_streets.map(id => ({
          value: id,
          label: state.road.cache[id] ? state.road.cache[id].name : 'ERROR',
        }))
        : [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentField);
