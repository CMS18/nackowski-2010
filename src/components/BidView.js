import React from 'react';
import { APIModule } from '../modules';

export class BidView extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            auctionID: "", 
            sum: "", 
            bidder: "",
            formErrors: {
                sum: 'Bud måste vara högre än ledande budet.',
                bidder: 'För att lägga bud ange ditt namn.'
            },
            status: false
        }
        this.handleOpenCurrentBidView = this.handleOpenCurrentBidView.bind(this);
        this.handleCloseCurrentBidView = this.handleCloseCurrentBidView.bind(this);
        this.onBidsUpdate = this.onBidsUpdate.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.status !== this.state.status){
            this.onBidsUpdate();
        }
    }

    onBidsUpdate(){
        let status = this.props.bidsUpdate;
        this.props.onUpdateBids(!status);
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
                AuktionID: ${this.props.auction.AuktionID}
                Summa: ${this.state.sum}
                Budgivare: ${this.state.bidder}
                `
            );
            APIModule.PostBid(this.state).then(function(response){ return response; }).then((data) => this.setState({ status: !this.state.status }));
        } else {
          formErrors.isFormValid = false;
          this.setState({ formErrors: formErrors });
          console.error('Error');
        }
        let bidderInput = document.getElementById('bidder');
        let bidInput = document.getElementById('bid');
        bidderInput.value = "";
        bidInput.value = "";
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        let sorted = this.props.bids.sort(function(a, b){ return parseInt(b.Summa) - parseInt(a.Summa)});
        if(sorted.length === 0){
            sorted = [0];
        }
        switch (name) {
          case 'sum':
            formErrors.sum =
              parseInt(value) < parseInt(sorted[0].Summa) ? 'Bud måste vara högre än ledande budet.' : '';
            break;
          case 'bidder':
            formErrors.bidder =
              value.length < 3 ? 'Ditt namn måste vara minst 3 tecken' : '';
            break;
          default:
        }
        let ID = this.props.auction.AuktionID
        this.setState({ auctionID: ID });
        this.setState({ formErrors, [name]: value });
      };

    handleOpenCurrentBidView(){
        this.props.handleShowBids();
    }

    handleCloseCurrentBidView(){
        this.props.handleCloseBids();
    }

    render(){
        let auction = this.props.auction;
        let currentDate = new Date();
        let auctionDate;
        if(auction !== null){
            auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
        }
        let bids;
        let allBids;
        if(this.props.bids !== null){
            bids = this.props.bids.sort(function(a, b){
                return parseInt(b.Summa) - parseInt(a.Summa);
            });
            allBids = this.props.bids.map((bid) => 
                <div className="bid">
                    <p className="bidText">{bid.Budgivare}</p>
                    <p className="bidText">{bid.BudID}</p>
                    <p className="bidText">{bid.Summa}kr</p>
                </div>
            );
        }
        const { formErrors } = this.state;
        const isFormValid = formErrors.isFormValid;
        const isSumValid =
        formErrors.sum.length > 0 && isFormValid === false;
        const isBidderValid =
        formErrors.bidder.length > 0 && isFormValid === false;
        return (
            <div className="bidViewContent">
                {this.props.showBids ? <div className="currentBidViewBackdrop" onClick={this.handleCloseCurrentBidView}></div> : null}
                {this.props.showBids ? 
                <div className="currentBidViewContent">
                    <div className="bidHistoryHeader">
                        <div className="bidHistoryHeaderText">
                            <h5 className="bidHistoryText">Budhistorik</h5>
                        </div>
                        <div className="closeButton">
                            <span onClick={this.handleCloseCurrentBidView}>X</span>
                        </div>
                    </div>
                    <div className="currentBids">
                        <p>Nuvarande mängd bud: {this.props.bids.length}</p>
                        <div className="bidInfoText">
                            <h4>Budgivare:</h4>
                            <h4>Bud ID:</h4>
                            <h4>Bud:</h4>
                        </div>
                        {allBids}
                    </div>
                </div> : null}
                <div className="showBidsText">
                    <p className="showBidsTag" onClick={this.handleOpenCurrentBidView}>Visa bud</p>
                </div>
                {+currentDate > +auctionDate ? 
                    <div className="showWinningBid">
                        <div className="winner">
                            {this.props.bids.length !== 0 ? 
                                <div className="winnerText">
                                    <h4>Vinnare: {bids[0].Budgivare}</h4>
                                    <h4>Bud ID: {bids[0].BudID}</h4>
                                    <h4>Bud: {bids[0].Summa}</h4>
                                </div>

                            :
                            
                                <div className="winnerText">
                                    <h4>Inget bud blev lagt på auktionen.</h4>
                                </div>}
                        </div>
                    </div>  
                
                : 
                
                    <div className="makeNewBidContent">
                        <form className="newBidForm" onSubmit={this.handleSubmit}>
                            <label>Place bid:</label>
                            <input 
                                id="bidder"
                                className="bidInput" 
                                type="text"
                                name="bidder"
                                placeholder="Ditt namn.."
                                onChange={this.handleChange} />
                            {isBidderValid && (
                                <span className="errorMessage">{formErrors.bidder}</span>
                            )}
                            <input 
                                id="bid"
                                className="bidInput" 
                                type="numbers"
                                name="sum"
                                placeholder={"Bud (kr).."}
                                onChange={this.handleChange} />
                            {isSumValid && (
                                <span className="errorMessage">{formErrors.sum}</span>
                            )}
                            <div className="createAuction">
                                <button className="createAuctionbtn" type="submit">Lägg bud</button>
                            </div>
                        </form>
                    </div> 
                }
            </div>
        );
    }
}