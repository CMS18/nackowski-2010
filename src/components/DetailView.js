import React from 'react';
import { APIModule } from '../modules';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/sv';
import { BidView } from './BidView';
import { Redirect } from 'react-router';

export class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noUpdate: true,
      auction: props.auction,
      status: false,
      bids: [],
      showBids: false,
      bidsUpdate: false,
      redirectToStartPage: false
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
    this.deleteAuction = this.deleteAuction.bind(this);
    this.handleCloseBids = this.handleCloseBids.bind(this);
    this.handleShowBids = this.handleShowBids.bind(this);
    this.onUpdateBids = this.onUpdateBids.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      console.log('Updating Auction..');
      this.onAuctionUpdate();
    }
    if(prevState.redirectToStartPage !== this.state.redirectToStartPage){
      this.onUpdate();
    }
    if (prevState.bidsUpdate !== this.state.bidsUpdate) {
      APIModule.GetBids(this.props.auction.AuktionID).then(function (response) { return response; }).then((data) => this.setState({ bids: data }));
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
    APIModule.GetBids(this.props.auction.AuktionID).then(function (response) { return response; }).then((data) => this.setState({ bids: data }));
  }

  onAuctionUpdate() {
    let status = this.props.status;
    this.props.onAuctionUpdate(!status);
  }

  onUpdateBids(value) {
    this.setState({ bidsUpdate: value });
  }

  handleCloseBids() {
    this.setState({ showBids: false });
  }

  handleShowBids() {
    this.setState({ showBids: true });

  }

  showUpdateDiv() {
    this.setState({ noUpdate: false });
  }

  showOriginalDiv() {
    this.setState({ noUpdate: true });
  }

  onUpdate() {
    const status = this.props.status;
    this.props.statusUpdated(!status);
  }

  deleteAuction() {
    const auction = this.state.auction;
    APIModule.DeleteAuction(auction).then(function (response) { return response; }).then((data) => this.setState({ redirectToStartPage: !this.state.redirectToStartPage }));
  }

  updatePost() {
    const auction = this.state.auction;
    APIModule.UpdateAuction(auction).then(function (response) { return response; }).then((data) => this.setState({ status: !this.state.status }));
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
    const newStartDate = new Date(date);
    newStartDate.setHours(newStartDate.getHours() + 2);
    const auction = this.state.auction;
    auction.StartDatum = newStartDate.toISOString().substring(0, 19);
    this.setState({ auction: auction });
  }

  updateDueDate(date) {
    const newDueDate = new Date(date);
    newDueDate.setHours(newDueDate.getHours() + 2);
    const auction = this.state.auction;
    auction.SlutDatum = newDueDate.toISOString().substring(0, 19);
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
    let currentDate = new Date();
    let auctionDate;
    if (this.state.auction !== null) {
      if (this.state.auction.SlutDatum) {
        auctionDate = new Date(this.state.auction.SlutDatum.replace('T', ' '));
      }
      else {
        auctionDate = this.state.SlutDatum;
      }
    }
    let length;
    if (this.state.bids !== null) {
      length = this.state.bids.length;
    }

    const redirectToStartPage = this.state.redirectToStartPage;
    if (redirectToStartPage === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {length === 0 ? (
          <div>{this.state.noUpdate ? (
            <div className="wrapper">
              <div className="form-wrapper2">
                <div className="columns">
                  <div className="test1">
                    <h3>Vald auktion</h3>
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
                          <label>{this.props.auction.StartDatum.replace('T', ' ')}</label>
                        </div>
                        <div className="presentAuctionInfo">
                          <label>{this.props.auction.SlutDatum.replace('T', ' ')}</label>
                        </div>
                        <div className="presentAuctionInfo">
                          <label>{this.props.auction.SkapadAv}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="test2">
                    {+currentDate < +auctionDate ?
                      <div className="marginTopBtn">
                        <div className="createAuction">
                          <button
                            className="styledbtn"
                            onClick={this.showUpdateDiv}
                          >
                            Uppdatera
                      </button>
                          <button className="styledbtn" onClick={this.deleteAuction}>Ta bort</button>
                        </div>
                      </div>
                      : null}
                    <BidView showBids={this.state.showBids} handleCloseBids={this.handleCloseBids} handleShowBids={this.handleShowBids} auction={this.state.auction} bids={this.state.bids} onUpdateBids={this.onUpdateBids} bidsUpdate={this.state.bidsUpdate} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
              <div className="wrapper">
                <div className="form-wrapper2">
                  <div className="columns">
                    <div>
                      <h3>Uppdatera auktion</h3>
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
                          <button className="styledbtn" onClick={this.updatePost}>
                            Spara
                      </button>
                          <button
                            className="styledbtn"
                            onClick={this.showOriginalDiv}
                          >
                            Cancel
                      </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
            )
          }
          </div>
        ) : (<div className="">
          <div className="wrapper">
            <div className="form-wrapper2">
              <div className="columns">
                <div className="test1">
                  <h3>Vald auktion</h3>
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
                        <label>{this.props.auction.StartDatum.replace('T', ' ')}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.SlutDatum.replace('T', ' ')}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.SkapadAv}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="test2">
                  <div className="marginTopBtn">
                  </div>
                  <BidView showBids={this.state.showBids} handleCloseBids={this.handleCloseBids} handleShowBids={this.handleShowBids} auction={this.state.auction} bids={this.state.bids} onUpdateBids={this.onUpdateBids} bidsUpdate={this.state.bidsUpdate} />
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
          )};
      </div>
    )
  }
}
