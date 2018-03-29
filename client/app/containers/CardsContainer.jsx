import { connect } from 'react-redux';
import Cards from '../components/Cards';

const mapStateToProps = state => {
  return {
    cards: [
      {
        title: 'Town Plans',
        items: [
          {
            title: '2015-2020 Road Paving Plan',
            active: true,
            color: '#EF4579',
          },
          {
            title: 'Sewer Repair Plan',
            active: true,
            color: '#F0E92D',
          },
          {
            title: 'Water Repair Plan',
            active: false,
            color: '#F26262',
          },
        ],
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
