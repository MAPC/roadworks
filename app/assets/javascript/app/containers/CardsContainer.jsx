import { connect } from 'react-redux';
import Cards from '../components/Cards';

import {
  fetchPlanViewData,
} from '../actions/fetchActions';

const mapStateToProps = state => {
  return {
    cards: [
      {
        title: 'Town Plans',
        type: 'plan',
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
        type: 'plan',
        items: [
          {
            title: '2019 Eversource Construction Plan',
            active: true,
            color: '#45CEEF',
          },
          {
            title: '5 Year Road Paving Plan',
            active: true,
            color: '#97E890',
          },
        ],
      },
      {
        title: 'All Permits',
        type: 'permit',
        items: [
          {
            title: 'Road Opening',
            active: false,
            color: '#45CEEF',
          },
          {
            title: 'Trench Digging',
            active: true,
            color: '#F26262',
          },
        ],
      },
      {
        title: 'Upcoming Permits',
        type: 'permit',
        items: [
          {
            title: 'Road Opening',
            active: true,
            color: '#45CEEF',
            tags: [
              {
                type: 'user',
                value: 'Eversource',
              },
              {
                type: 'time',
                value: '3/21 - 4/1',
              },
            ],
          },
        ],
      },
    ],
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchData: () => dispatch(fetchPlanViewData(props.match.params.city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
