import { connect } from 'react-redux';
import CardList from '../components/CardList';

import {
  fetchPlanViewData,
} from '../actions/fetchActions';

import {
  toggleActive,
} from '../actions/viewActions';

const mapStateToProps = (state) => {
  const plans = Object.keys(state.plan.cache).map((planId) => ({
    id: planId,
    title: state.plan.cache[planId].name,
    active: state.view.active[planId],
    color: state.plan.cache[planId].color,
  }));
  return {
    cards: [
      {
        title: 'Plans and Moratoriums',
        type: 'plan',
        items: plans,
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
  toggleActive: (id) => dispatch(toggleActive(id)),
  fetchData: () => dispatch(fetchPlanViewData(props.match.params.city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
