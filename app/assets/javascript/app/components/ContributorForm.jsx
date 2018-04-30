import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import TextField from './fields/TextField';

import en from '../constants/en';

class ContributorForm extends React.Component {

  componentWillMount() {
    this.props.fetchContributors();
  }

  render() {
    const contributorRows = this.props.contributors.map((contrib) => (
      <li key={contrib.id} className="contributor">
        <div className="contributor-details">
          <input
            value={contrib.name}
            readOnly
          />
          <input className="contributor-link" value={contrib.link} readOnly/>
          <button
            className="styled primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.regenerate(contrib.id);
            }}
            disabled={!contrib.unlocked}
          >
            {en.CONTRIBUTOR_FORM.REGENERATE_BUTTON}
          </button>
          <button
            className="styled primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.unlock(contrib.id);
            }}
            disabled={contrib.unlocked}
          >
            {en.CONTRIBUTOR_FORM.UNLOCK_CONTRIBUTOR}
          </button>
        </div>
        <div>
          {contrib.unlocked ? (<p className="contributor-warning">{en.CONTRIBUTOR_FORM.REGENERATE_WARNING}</p>) : null}
        </div>
      </li>
    ))
    return (
      <div className="component ContributorForm">
        <form className="form-box">
          <div className="form-header">
            <h2>{en.CONTRIBUTOR_FORM.TITLE}</h2>
            <Link to={this.props.location.pathname}>X Close</Link>
          </div>
          <p className="form-description">{en.CONTRIBUTOR_FORM.DESCRIPTION}</p>
          <div className="contributor-list-wrapper">
            <ul className="contributor-list">
              {contributorRows.length ? contributorRows : (
                <li className="contributor placeholder">
                  <p>{en.CONTRIBUTOR_FORM.NO_CONTRIBUTORS_YET}</p>
                </li>
              )}
            </ul>
          </div>
          <div className="contributor-add">
            <label htmlFor="name">{en.CONTRIBUTOR_FORM.CONTRIBUTOR_LABEL}</label>
            <TextField
              value={this.props.newContributorName}
              name="name"
              placeholder="Name of a utility or town department"
              onChange={this.props.onNewContributorNameChange}
            />
            <button
              className="styled primary"
              onClick={this.props.createNewContributor}
              disabled={this.props.isPending}
            >
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
  regenerate: PropTypes.func.isRequired,
  newContributorName: PropTypes.string.isRequired,
  onNewContributorNameChange: PropTypes.func.isRequired,
  createNewContributor: PropTypes.func.isRequired,
};

export default ContributorForm;
