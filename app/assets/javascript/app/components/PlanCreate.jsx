import React from 'react';

import Form from './Form';
import PlanFormContainer from '../containers/PlanFormContainer';


class PlanCreate extends Form {

  afterSubmit(err) {
    if (!err)  {
      this.props.createPlan();
    }
  }

  render() {
    return (
      <section className="component PlanCreate">
        <h3>Add Plan to Map</h3>

        <PlanFormContainer />

        <button
          className="styled primary"
          data-action="add-to-map"
          onClick={this.submit}
        >
          <span className="plus">+</span>
          Add to Map
        </button>
      </section>
    );
  }

};


export default PlanCreate;
