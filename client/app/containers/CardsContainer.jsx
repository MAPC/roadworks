import { connect } from 'react-redux';
import Cards from '../components/Cards';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
