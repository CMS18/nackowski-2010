import React from 'react';
import { APIModule } from '../modules';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/sv';

export class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noUpdate: true,
      auction: props.auction
    };
    this.showUpdateDiv = this.showUpdateDiv.bind(this);
    this.showOriginalDiv = this.showOriginalDiv.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateAcceptedPrice = this.updateAcceptedPrice.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  showUpdateDiv() {
    this.setState({ noUpdate: false });
  }

  showOriginalDiv() {
    this.setState({ noUpdate: true });
  }

  updatePost() {
    const auction = this.state.auction;
    APIModule.UpdateAuction(auction);
  }

  updateTitle(e) {
    const title = e.target.value;
    const auction = this.state.auction;
    auction.Titel = title;
    this.setState({ auction: auction });
  }

  updateDescription(e) {
    const description = e.target.value;
    const auction = this.state.auction;
    auction.Beskrivning = description;
    this.setState({ auction: auction });
  }

  updateAcceptedPrice(e) {
    const acceptedPrice = e.target.value;
    const auction = this.state.auction;
    auction.Utropspris = acceptedPrice;
    this.setState({ auction: auction });
  }

  updateStartDate(date) {
    const startDate = date;
    const auction = this.state.auction;
    auction.StartDatum = startDate;
    this.setState({ auction: auction });
  }

  updateDueDate(date) {
    const dueDate = date;
    const auction = this.state.auction;
    auction.SlutDatum = dueDate;
    this.setState({ auction: auction });
  }

  updateInput(e) {
    const updateInput = e.target.value;
    const auction = this.state.auction;
    auction.SkapadAv = updateInput;
    this.setState({ auction: auction });
  }

  render() {
    const minDueDate = this.state.startDate
      ? moment(this.state.startDate, 'DD-MM-YYYY')
          .add(1, 'days')
          .toDate()
      : new Date();
    return (
      <div>
        {this.state.noUpdate ? (
          <div className="wrapper">
            <div className="form-wrapper2">
              <div className="columns">
                <div>
                  <p className="auctionTitle">Vald auktion</p>
                  <div className="presentCols">
                    <div className="presentCol1">
                      <div className="presentAuctionInfo">
                        <label className="labelsPresentation">Titel:</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Beskrivning:</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Accepterat pris:</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Startdatum</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Slutdatum</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Skapad av:</label>
                      </div>
                    </div>
                    <div className="presentCol2">
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.Titel}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.Beskrivning}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.Utropspris}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.StartDatum}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.SlutDatum}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.SkapadAv}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="marginTopBtn">
                    <div className="createAuction">
                      <button
                        className="styledbtn"
                        onClick={this.showUpdateDiv}
                      >
                        Uppdatera
                      </button>
                      <button className="styledbtn">Ta bort</button>
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <div className="form-wrapper2">
              <div className="columns">
                <div>
                  <p className="auctionTitle">Uppdatera auktion</p>
                  <div className="presentCols">
                    <div className="presentCol1">
                      <div className="presentAuctionInfo">
                        <label className="labelsPresentation">Titel:</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Beskrivning:</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Accepterat pris:</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Startdatum</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Slutdatum</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>Skapad av:</label>
                      </div>
                    </div>
                    <div className="presentCol2">
                      <div className="presentAuctionInfo">
                        <input
                          className="updateInput"
                          onChange={this.updateTitle}
                          placeholder={this.state.auction.Titel}
                        />
                      </div>
                      <div className="presentAuctionInfo">
                        <input
                          className="updateInput"
                          onChange={this.updateDescription}
                          placeholder={this.state.auction.Beskrivning}
                        />
                      </div>
                      <div className="presentAuctionInfo">
                        <input
                          className="updateInput"
                          onChange={this.updateAcceptedPrice}
                          placeholder={this.state.auction.Utropspris}
                        />
                      </div>
                      <div className="presentAuctionInfo">
                        <DatePicker
                          className="updateInput"
                          selected={moment(
                            this.state.auction.StartDatum
                          ).toDate()}
                          timeInputLabel="Time:"
                          onChange={this.updateStartDate}
                          dateFormat="yyyy/MM/dd HH:mm"
                          showTimeInput
                          minDate={new Date()}
                        />
                      </div>
                      <div className="presentAuctionInfo">
                        <DatePicker
                          className="updateInput"
                          selected={moment(
                            this.state.auction.SlutDatum
                          ).toDate()}
                          timeInputLabel="Time:"
                          onChange={this.updateDueDate}
                          dateFormat="yyyy/MM/dd HH:mm"
                          showTimeInput
                          minDate={minDueDate}
                        />
                      </div>
                      <div className="presentAuctionInfo">
                        <input
                          className="updateInput"
                          onChange={this.updateInput}
                          placeholder={this.state.auction.SkapadAv}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="marginTopBtn">
                    <div className="createAuction">
                      <button
                        className="styledbtn"
                        onClick={this.showOriginalDiv}
                      >
                        Cancel
                      </button>
                      <button className="styledbtn" onClick={this.updatePost}>
                        Spara
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        )}
      </div>
    );
  }
}
