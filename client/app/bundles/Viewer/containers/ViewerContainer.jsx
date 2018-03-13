import { connect } from 'react-redux';
import Viewer from '../components/Viewer';

const mapStateToProps = (state, props) => ({
  name: state.name
});

const mapDispatchToProps = (dispatch, props) => {
  // parse
  return {
    doSomethingInteresting: () => dispatch(actionCreator(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
