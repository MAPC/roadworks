import PropTypes from 'prop-types';
import React from 'react';

import TextField from './fields/TextField';

import en from '../constants/en';

class ContributorForm extends React.Component {

  render() {
    const contributorRows = this.props.contributors.map((contrib) => (
      <li key={contrib.id}>
        <input
          value={contrib.name}
          onChange={this.props.onContributorNameChange}
        />
        <input value={contrib.link} readOnly/>
        <button onClick={() => this.props.regenerate(contrib.id)}>
          {en.CONTRIBUTOR_FORM.REGENERATE_BUTTON}
        </button>
      </li>
    ))
    return (
      <div className="component ContributorForm">
        <form className="form-box">
          <h2 className="form-header">{en.CONTRIBUTOR_FORM.TITLE}</h2>
          <p className="form-description">{en.CONTRIBUTOR_FORM.DESCRIPTION}</p>
          <div className="contributor-list-wrapper">
            <ul>
              {contributorRows}
            </ul>
          </div>
          <div className="contributor-add">
            <div className="field">
              <label htmlFor="name">Contributor Name</label>
              <TextField
                value={this.props.newContributorName}
                name="name"
                placeholder="Name of a utility or town department"
                onChange={this.props.onNewContributorNameChange}
              />
            </div>
            <button onClick={this.props.createNewContributor}>
              {en.CONTRIBUTOR_FORM.ADD_CONTRIBUTOR}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ContributorForm.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
  onContributorNameChange: PropTypes.func.isRequired,
  regenerate: PropTypes.func.isRequired,
  newContributorName: PropTypes.string.isRequired,
  onNewContributorNameChange: PropTypes.func.isRequired,
  createNewContributor: PropTypes.func.isRequired,
};

export default ContributorForm;
