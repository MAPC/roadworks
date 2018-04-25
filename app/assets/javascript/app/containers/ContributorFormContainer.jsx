import { connect } from 'react-redux';
import ContributorForm from '../components/ContributorForm';

import {
  contributorNameChange,
  contributorRegenerateToken,
  contributorNewNameChange,
  contributorCreateNew,
} from '../actions/contributorActions';

const mapStateToProps = (state, props) => {
  return {
    contributors: [{
      id: '1234567890',
      name: 'Water Department',
      link: 'https://roadworks.mapc.org/login?token=1234567890',
    }],
    newContributorName: 'Eversource',
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onContributorNameChange: () => dispatch(contributorNameChange()),
    regenerate: () => dispatch(contributorRegenerateToken()),
    onNewContributorNameChange: () => dispatch(contributorNewNameChange()),
    createNewContributor: () => dispatch(contributorCreateNew()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContributorForm);
