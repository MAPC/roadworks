import React from 'react';


class Form extends React.Component {

  constructor(props) {
    super(props);
    
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
  }

  submit() {
    this.afterSubmit(this.validate());
  }

  afterSubmit(err, result) {
    if (err) {
      console.error(err);
    }
  }

  validate() {
    console.log(this);
  }

}

export default Form;
