import { connect } from 'react-redux';
import ContributorForm from '../components/ContributorForm';

import {
  newContributorNameChange,
  contributorRegenerateToken,
  contributorNewNameChange,
  contributorCreateNew,
  contributorUnlock,
} from '../actions/contributorFormActions';

import {
  fetchContributors,
} from '../actions/fetchActions';

import capitalize from '../util/capitalize';

const mapStateToProps = (state, props) => {
  const cityName = props.match.params.city.toUpperCase().replace(/-/g, ' ');
  return {
    contributors: Object.values(state.user.cache).reduce((arr, user) => {
      const link = `${window.location.origin}/${props.match.params.city}?token=${user.token}`;
      return user.city_name == cityName && user.role == 'utility'
          ? arr.concat([{
              id: user.id,
              name: user.name,
              link,
              unlocked: state.contributorForm.unlockedContributor == user.id,
            }])
          : arr;
    }, []),
    newContributorName: state.contributorForm.newContributorName,
    isPending: state.contributorForm.isPending,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchContributors: () => dispatch(fetchContributors()),
    regenerate: (id) => dispatch(contributorRegenerateToken(id)),
    unlock: (id) => dispatch(contributorUnlock(id)),
    onNewContributorNameChange: (name) => dispatch(newContributorNameChange(name)),
    createNewContributor: () => dispatch(contributorCreateNew()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContributorForm);
