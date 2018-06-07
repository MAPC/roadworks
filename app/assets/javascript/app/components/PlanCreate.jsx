import React from 'react';
import { Link } from 'react-router-dom';

import AbstractForm from './abstract/AbstractForm';
import PlanFormContainer from '../containers/PlanFormContainer';


class PlanCreate extends AbstractForm {

  validate(props) {
    const plan = props.workingPlan;

    if (!plan.name || plan.name === "") {
      this.markInvalid('plan-name');
    }

    if (!plan.plan_type || plan.plan_type === "NONE") {
      this.markInvalid('plan-type');
    }

    if (Array.isArray(plan.timeframes) && plan.timeframes.length > 0) {
      plan.timeframes.filter((tf) => !tf._destroy).forEach((timeframe, i) => {
        if (timeframe.start === null) {
          this.markInvalid(`start-date-month-${i}`);
          this.markInvalid(`start-date-year-${i}`);
        }
        if (timeframe.end === null) {
          this.markInvalid(`end-date-month-${i}`);
          this.markInvalid(`end-date-year-${i}`);
        }

        if (Array.isArray(timeframe.segments) && timeframe.segments.length > 0) {
          timeframe.segments.filter((tf) => !tf._destroy).forEach((segment, j) => {
            if (segment.road_id === null)  {
              this.markInvalid(`segment-${i}-${j}`);
            }

            if (segment.is_segment) {
              if (segment.orig === null || segment.orig === "") {
                this.markInvalid(`segment-orig-${i}-${j}`);
              }
              if (segment.dest === null || segment.dest === "") {
                this.markInvalid(`segment-dest-${i}-${j}`);
              }
            }
          });
        }
        else {
          this.invalidate(`No roads in Timeframe #${i}`);
        }
      });
    }
    else {
      this.invalidate('No timeframes created');
    }
  }

  formDidValidate() {
    if (this.props.workingPlan.id) {
      return this.props.updatePlan();
    }
    return this.props.createPlan();
  }

  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    const errorMessage = (this.state.errorMessage !== null)
        ? <div className="error-message">{this.state.errorMessage}</div>
        : null;
    const twoHangingButtons = this.props.workingPlan.id ? ' two-buttons' : '';
    return (
      <section
        className={`component PlanCreate${twoHangingButtons}`}
        data-form={this.formId}
      >
        <button
          className="button styled"
          data-action="toggle-plan-form"
          onClick={this.props.cancel}
        >
          <div>
            <span className="x">+</span> Cancel
          </div>
        </button>

        <div className="form-block">
          <h3>Add Plan to Map</h3>

          <PlanFormContainer />

          {errorMessage}

          <button
            className="styled primary hanging"
            data-action="add-to-map"
            onClick={this.submit}
            disabled={this.props.isPending}
          >
            <span className="plus">+</span>
            {this.props.workingPlan.id ? 'Edit plan' : 'Create plan'}
          </button>

          {this.props.workingPlan.id ? (
            <button
              className="styled primary hanging"
              data-action="remove-from-map"
              onClick={(e) => {
                e.preventDefault();
                this.props.deletePlan(this.props.workingPlan.id);
              }}
              disabled={this.props.isPending}
            >
              <span className="plus">-</span>
              {'Delete plan'}
            </button>
          ) : null}
        </div>
      </section>
    );
  }

};


export default PlanCreate;
