import React from 'react';
import uuid from 'uuid';


class AbstractForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };

    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    this.formDidValidate = this.formDidValidate.bind(this);
    this.triggerValidate= this.triggerValidate.bind(this);

    this.formId = uuid.v4();
    this.hasSubmitted = false;
    this.hasSetError = false;
    this.valid = true;
  }

  triggerValidate() {
    const form = document.querySelector(`*[data-form="${this.formId}"]`);
    Array.from(form.querySelectorAll('.invalid')).forEach(field => field.classList.remove('invalid'));

    if (this.state.errorMessage !== null) {
      this.setState({ errorMessage: null });
    }

    this.valid = true;

    try {
      this.validate(this.props);
    }
    catch(e) {
      this.valid = false;
    }
  }

  validate(props)   { /* Defined by concrete class */ }

  formDidValidate() { /* Defined by concrete class */ }

  componentDidUpdate() {
    if (this.hasSubmitted && !this.hasSetError) {
      this.triggerValidate();
    }
    else {
      this.hasSetError = false;
    }
  }

  submit(e) {
    e.preventDefault();
    this.hasSubmitted = true;
    this.triggerValidate(this.props);
    if (this.valid) {
      this.formDidValidate();
    }
  }

  invalidate(errorMessage) {
    this.hasSetError = true;
    this.setState({ errorMessage });

    throw new Error(errorMessage);
  }

  markInvalid(name) {
    this.valid = false;

    Array.from(document.querySelectorAll(`*[name="${name}"]`))
         .forEach(field => field.classList.add('invalid'));
  }

}

export default AbstractForm;
