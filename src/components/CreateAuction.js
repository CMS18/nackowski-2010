import React, { Component } from "react";
import { APIModule } from '../modules';
import moment from "moment";
import "moment/locale/sv";

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
      formErrors: {
        title: "",
        description: "",
        acceptedPrice: "",
        startDate: "",
        dueDate: "",
        createdBy: ""
      }
    };
  }

  formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.formValid(this.state)) {
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

      APIModule.PostAuction(this.state);
    } else {
      console.error("Error");
    }
  };

  handlePriceChange = e => {
    const { value } = e.target;
    this.setState({ acceptedPrice: value });
  };

  handleStartDateChange = e => {
    const { value } = e.target;
    console.log(
      "value",
      moment(value)
        .add(1, "h")
        .toString()
    );
    this.setState({ startDate: moment(value).add(1, "h") });
  };

  handleDueDateChange = e => {
    const { value } = e.target;
    this.setState({ dueDate: moment(value).add(2, "h") });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "title":
        formErrors.title =
          value.length < 5 ? "En titel måste vara minst 5 tecken" : "";
        break;
      case "description":
        formErrors.description =
          value.length < 5 ? "En beskrivning måste vara minst 5 tecken" : "";
        break;
      case "createdBy":
        formErrors.createdBy =
          value.length < 3 ? "Ditt namn måste vara minst 3 tecken" : "";
        break;
      default:
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Skapa auktion</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="title">
              <label htmlFor="title">Titel:</label>
              <input
                className={formErrors.title.length > 0 ? "error" : null}
                type="text"
                name="title"
                placeholder="Exempel: Logitech G703 Lightspeed"
                onChange={this.handleChange}
              />
              {formErrors.title.length > 0 && (
                <span className="errorMessage">{formErrors.title}</span>
              )}
            </div>
            <div className="description">
              <label htmlFor="description">Beskrivning:</label>
              <input
                className={formErrors.description.length > 0 ? "error" : null}
                type="text"
                name="description"
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>
            <div className="acceptedPrice">
              <label htmlFor="acceptedPrice">Accepterat pris:</label>
              <input
                type="number"
                name="acceptedPrice"
                onChange={this.handlePriceChange}
              />
            </div>
            <br />
            <div className="startDate">
              <label htmlFor="startDate">Startdatum</label>
              <input
                type="date"
                name="startDate"
                onChange={this.handleStartDateChange}
              />
            </div>
            <div className="dueDate">
              <label htmlFor="dueDate">Slutdatum</label>
              <input
                type="date"
                name="dueDate"
                onChange={this.handleDueDateChange}
              />
            </div>
            <div className="createdBy">
              <label htmlFor="createdBy">Skapad av:</label>
              <input
                className={formErrors.createdBy.length > 0 ? "error" : null}
                type="text"
                name="createdBy"
                onChange={this.handleChange}
              />
              {formErrors.createdBy.length > 0 && (
                <span className="errorMessage">{formErrors.createdBy}</span>
              )}
            </div>
            <div className="createAuction">
              <button type="submit">Skapa auktion</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
