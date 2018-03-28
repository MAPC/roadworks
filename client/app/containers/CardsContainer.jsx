import { connect } from 'react-redux';
import Cards from '../components/Cards';

const mapStateToProps = state => {
  return {
    cards: [
      {
        title: 'Town Plans',
        items: [],
      },
      {
        title: 'Utility Company Capital Plans',
        items: [],
      },
      {
        title: 'All Permits',
        items: [],
      },
      {
        title: 'Upcoming Permits',
        items: [],
      },
    ],
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
