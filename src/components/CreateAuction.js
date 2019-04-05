import React, { Component } from 'react';
import { APIModule } from '../modules';
import moment from 'moment';
import 'moment/locale/sv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from 'react-router';

export default class CreateAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      acceptedPrice: null,
      startDate: null,
      dueDate: null,
      createdBy: null,
      redirectToStartPage: false,
      formErrors: {
        isFormValid: null,
        title: 'En titel måste vara minst 3 tecken',
        description: 'En beskrivning måste vara minst 3 tecken',
        acceptedPrice: 'Ett belopp måste anges',
        startDate: 'Ett datum måste anges',
        dueDate: 'Ett datum måste anges',
        createdBy: 'Ditt namn måste vara minst 3 tecken'
      }
    };
  }

  formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
      val !== null && val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();
    const formErrors = this.state.formErrors;
    if (this.formValid(this.state)) {
      formErrors.isFormValid = true;
      this.setState({ formErrors: formErrors });
      console.log(
        `---Submitting---
      Titel: ${this.state.title}
      Beskrivning: ${this.state.description}
      Accepterat pris: ${this.state.acceptedPrice}
      Startdatum: ${this.state.startDate}
      Slutdatum: ${this.state.dueDate}
      createdBy: ${this.state.createdBy}
      `
      );
      console.log('Innan vi skickar till API', this.state);
      APIModule.PostAuction(this.state);
      this.setState({ redirectToStartPage: true });
    } else {
      formErrors.isFormValid = false;
      this.setState({ formErrors: formErrors });
      console.error('Error');
    }
  };

  handleStartDateChange = date => {
    const { formErrors } = this.state;

    formErrors.startDate = '';
    formErrors.dueDate = 'Ett datum måste anges';

    this.setState({
      formErrors: formErrors,
      startDate: date,
      dueDate: null
    });
  };

  handleDueDateChange = date => {
    const { formErrors } = this.state;

    formErrors.dueDate = '';
    this.setState({ formErrors: formErrors, dueDate: date });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'title':
        formErrors.title =
          value.length < 3 ? 'En titel måste vara minst 3 tecken' : '';
        break;
      case 'description':
        formErrors.description =
          value.length < 3 ? 'En beskrivning måste vara minst 3 tecken' : '';
        break;
      case 'createdBy':
        formErrors.createdBy =
          value.length < 3 ? 'Ditt namn måste vara minst 3 tecken' : '';
        break;
      case 'acceptedPrice':
        formErrors.acceptedPrice =
          value < 1 || value === '' ? 'Minsta belopp 1 sek' : '';
        break;
      default:
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    const isFormValid = formErrors.isFormValid;
    const isTitleValid = formErrors.title.length > 0 && isFormValid === false;
    const isDescriptionValid =
      formErrors.description.length > 0 && isFormValid === false;
    const isCreatedByValid =
      formErrors.createdBy.length > 0 && isFormValid === false;
    const isAcceptedPriceValid =
      formErrors.acceptedPrice.length > 0 && isFormValid === false;
    const isStartDateValid =
      formErrors.startDate.length > 0 && isFormValid === false;
    const isDueDateValid =
      formErrors.dueDate.length > 0 && isFormValid === false;

    const minDueDate = this.state.startDate
      ? moment(this.state.startDate, 'DD-MM-YYYY')
        .add(1, 'days')
        .toDate()
      : new Date();

    const redirectToStartPage = this.state.redirectToStartPage;
    if (redirectToStartPage === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Skapa auktion</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="title">
              <label htmlFor="title">Titel:</label>
              <input
                className={isTitleValid ? 'error' : null}
                type="text"
                name="title"
                placeholder="Exempel: Logitech G703 Lightspeed"
                onChange={this.handleChange}
              />
              {isTitleValid && (
                <span className="errorMessage">{formErrors.title}</span>
              )}
            </div>
            <div className="description">
              <label htmlFor="description">Beskrivning:</label>
              <input
                className={isDescriptionValid ? 'error' : null}
                type="text"
                name="description"
                onChange={this.handleChange}
              />
              {isDescriptionValid && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>
            <div className="acceptedPrice">
              <label htmlFor="acceptedPrice">Accepterat pris:</label>
              <input
                className={isAcceptedPriceValid ? 'error' : null}
                type="number"
                name="acceptedPrice"
                onChange={this.handleChange}
              />
              {isAcceptedPriceValid && (
                <span className="errorMessage">{formErrors.acceptedPrice}</span>
              )}
            </div>
            <div className="startDate">
              <label htmlFor="startDate">Startdatum</label>
              <DatePicker
                className={isStartDateValid ? 'error' : null}
                selected={this.state.startDate}
                timeInputLabel="Time:"
                onChange={this.handleStartDateChange}
                dateFormat="yyyy/MM/dd HH:mm"
                showTimeInput
                minDate={new Date()}
              />
              {isStartDateValid && (
                <span className="errorMessage">{formErrors.startDate}</span>
              )}
            </div>
            <div className="dueDate">
              <label htmlFor="dueDate">Slutdatum</label>
              <DatePicker
                className={isDueDateValid ? 'error' : null}
                selected={this.state.dueDate}
                timeInputLabel="Time:"
                onChange={this.handleDueDateChange}
                dateFormat="yyyy/MM/dd HH:mm"
                showTimeInput
                minDate={minDueDate}
              />
              {isDueDateValid && (
                <span className="errorMessage">{formErrors.dueDate}</span>
              )}
            </div>
            <div className="createdBy">
              <label htmlFor="createdBy">Skapad av:</label>
              <input
                className={isCreatedByValid ? 'error' : null}
                type="text"
                name="createdBy"
                onChange={this.handleChange}
              />
              {isCreatedByValid && (
                <span className="errorMessage">{formErrors.createdBy}</span>
              )}
            </div>
            <div className="createAuction">
              <button className="createAuctionbtn" type="submit">Skapa auktion</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
