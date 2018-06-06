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

const mapStateToProps = (state, props) => {
  const cityName = props.match.params.city.toUpperCase().replace(/-/g, ' ');
  const plans = Object.values(state.plan.cache)
    .filter((plan) => plan.city == cityName)
    .map((plan) => ({
      id: plan.id,
      type: enums.CARD_ROW.TYPES.PLAN,
      title: plan.name,
      active: !state.view.hiddenPlans[plan.id],
      color: plan.color,
      editable: plan.user_id == state.user.id,
    }));
  return {
    loggedIn: !!state.user.id,
    user: state.user.cache[state.user.id],
    hideAllPlans: state.view.hideAllPlans,
    hideAllPermitTypes: state.view.hideAllPermitTypes,
    plans,
    permitTypes: (cityName == 'MILTON' ? [
      {
        id: 'GENERAL',
        type: enums.CARD_ROW.TYPES.PERMIT_TYPE,
        title: 'General',
        active: !state.view.hiddenPermitTypes['GENERAL'],
        color: enums.PERMIT_TYPE_COLORS['GENERAL'],
      },
      {
        id: 'DRIVEWAY_ENTRANCE',
        type: enums.CARD_ROW.TYPES.PERMIT_TYPE,
        title: 'Driveway Entrance',
        active: !state.view.hiddenPermitTypes['DRIVEWAY_ENTRANCE'],
        color: enums.PERMIT_TYPE_COLORS['DRIVEWAY_ENTRANCE'],
      },
    ] : [
      {
        id: 'ROAD_OPENING',
        type: enums.CARD_ROW.TYPES.PERMIT_TYPE,
        title: 'Road Opening',
        active: !state.view.hiddenPermitTypes['ROAD_OPENING'],
        color: enums.PERMIT_TYPE_COLORS['ROAD_OPENING'],
      },
      {
        id: 'TRENCH',
        type: enums.CARD_ROW.TYPES.PERMIT_TYPE,
        title: 'Trench',
        active: !state.view.hiddenPermitTypes['TRENCH'],
        color: enums.PERMIT_TYPE_COLORS['TRENCH'],
      },
    ]),
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
