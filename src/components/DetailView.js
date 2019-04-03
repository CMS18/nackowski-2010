import React from 'react';

export class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noUpdate: true
    };
    this.showUpdateDiv = this.showUpdateDiv.bind(this);
  }

  showUpdateDiv() {
    this.setState({ noUpdate: false });
  }

  render() {
    const startDate = this.props.auction.StartDatum;
    const dueDate = this.props.auction.SlutDatum;

    return (
      <div>
        {this.state.noUpdate ? (
          <div className="wrapper">
            <div className="form-wrapper">
              <div className="columns">
                <div>
                  <h1>Vald auktion</h1>
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
                        <label>{startDate}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{dueDate}</label>
                      </div>
                      <div className="presentAuctionInfo">
                        <label>{this.props.auction.SkapadAv}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="createAuction">
                    <button>Ta bort</button>
                    <button onClick={this.showUpdateDiv}>Uppdatera</button>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        ) : (
          <div>
            <h4>TEST</h4>
          </div>
        )}
      </div>
    );
  }
}
