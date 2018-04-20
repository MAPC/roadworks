import { connect } from 'react-redux';
import CardList from '../components/CardList';
import enums from '../constants/enums';

import {
  fetchPlanViewData,
} from '../actions/fetchActions';

import {
  toggleAllPlans,
  togglePlan,
  toggleAllPermitTypes,
  togglePermitType,
} from '../actions/viewActions';

const mapStateToProps = (state) => {
  const plans = Object.keys(state.plan.cache).map((planId) => ({
    id: planId,
    title: state.plan.cache[planId].name,
    active: !state.view.hiddenPlans[planId],
    color: state.plan.cache[planId].color,
  }));
  return {
    hideAllPlans: state.view.hideAllPlans,
    hideAllPermitTypes: state.view.hideAllPermitTypes,
    plans,
    permitTypes: [
      {
        id: 'STREET_OPENING',
        title: 'Road Opening',
        active: !state.view.hiddenPermitTypes['STREET_OPENING'],
        color: enums.PERMIT_TYPE_COLORS['STREET_OPENING'],
      },
      {
        id: 'TRENCH',
        title: 'Trench',
        active: !state.view.hiddenPermitTypes['TRENCH'],
        color: enums.PERMIT_TYPE_COLORS['TRENCH'],
      },
    ],
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchData: () => dispatch(fetchPlanViewData(props.match.params.city)),
  toggleAllPlans: () => dispatch(toggleAllPlans()),
  togglePlan: (id) => dispatch(togglePlan(id)),
  toggleAllPermitTypes: () => dispatch(toggleAllPermitTypes()),
  togglePermitType: (permitType) => dispatch(togglePermitType(permitType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
