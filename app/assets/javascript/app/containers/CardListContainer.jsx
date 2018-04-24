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
  toggleDetails,
} from '../actions/viewActions';

import {
  loadExistingPlan,
} from '../actions/workingPlanActions';

const mapStateToProps = (state) => {
  const plans = Object.keys(state.plan.cache).map((planId) => ({
    id: planId,
    type: enums.CARD_ROW.TYPES.PLAN,
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
        type: enums.CARD_ROW.TYPES.PERMIT_TYPE,
        title: 'Road Opening',
        active: !state.view.hiddenPermitTypes['STREET_OPENING'],
        color: enums.PERMIT_TYPE_COLORS['STREET_OPENING'],
      },
      {
        id: 'TRENCH',
        type: enums.CARD_ROW.TYPES.PERMIT_TYPE,
        title: 'Trench',
        active: !state.view.hiddenPermitTypes['TRENCH'],
        color: enums.PERMIT_TYPE_COLORS['TRENCH'],
      },
    ],
    hideDetails: state.view.hideDetails,
    details: state.view.details.rows.map((row, index) => ({
      id: index,
      type: enums.CARD_ROW.TYPES.DETAIL,
      label: row.label,
      value: row.value,
    })),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchData: () => dispatch(fetchPlanViewData(props.match.params.city)),
  toggleAllPlans: () => dispatch(toggleAllPlans()),
  togglePlan: (id) => dispatch(togglePlan(id)),
  toggleAllPermitTypes: () => dispatch(toggleAllPermitTypes()),
  togglePermitType: (permitType) => dispatch(togglePermitType(permitType)),
  toggleDetails: () => dispatch(toggleDetails()),
  onEditPlan: (id) => dispatch(loadExistingPlan(id, `${props.match.params.city}/plan/create`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
