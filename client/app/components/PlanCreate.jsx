import React from 'react';

import PlanFormContainer from '../containers/PlanFormContainer';


class PlanCreate extends React.Component {

  render() {
    return (
      <section className="component PlanCreate">
        <h3>Add Plan to Map</h3>

        <PlanFormContainer />    

        <button className="styled primary" data-action="add-to-map">
          <span class="plus">+</span>
          Add to Map
        </button>
      </section>
    );
  }

};


export default PlanCreate;
