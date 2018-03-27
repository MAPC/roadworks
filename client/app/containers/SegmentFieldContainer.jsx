import { connect } from 'react-redux';
import SegmentField from '../components/fields/SegmentField';

const mapStateToProps = (state, props) => {
  const composeCrossStreetName = (nodeId) => {
    const roadIds = props.segment.crossStreetNodeMap[nodeId];
    if (roadIds.length) {

    }
    return 'UNNAMED ROAD';
  };

  const generateCrossStreetOptions = (roadId, nodeIds, nodeMap, roadMap) => {
    const moreThanOnce = {};
    const seenRoads = [];
    nodeIds.forEach((id) => {
      if (seenRoads.includes(id)) {
        moreThanOnce[id] = 1;
      }
      seenRoads.push(id);
    });
    const options = nodeIds.reduce((opts, id) => {
      let label = 'UNNAMED ROAD';
      const roads = nodeMap[id].part_of.filter(id => id != roadId);
      if (roads.length == 1) {
        label = roadMap[roads[0]].name || 'UNNAMED ROAD';
        return opts.concat({ value: id, label });
      } else if (roads.length > 1) {
        label = roads.slice(1).reduce(
          (acc, id) => `${acc} and ${roadMap[id].name || 'UNNAMED ROAD'}`,
        (roadMap[roads[0]].name || 'UNNAMED ROAD'));
        return opts.concat({ value: id, label });
      }
      return opts;
    }, []);
    return options;
  };


  const segment = state.workingPlan.segments[props.id];
  return {
    roadOptions: state.road.cityIndex.map(id => ({
      value: id,
      label: state.road.cache[id].name,
    })),
    crossStreetOptions: props.segment.road
        ? generateCrossStreetOptions(
            props.segment.road,
            Object.keys(props.segment.crossStreetNodeMap),
            state.node.cache,
            state.road.cache
          )
        : [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentField);
