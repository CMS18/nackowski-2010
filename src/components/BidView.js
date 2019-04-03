import React from 'react';

export class BidView extends React.Component{
    constructor(props){
        super(props);
        this.state = { auctionID: "", sum: "", bidder: "" }
        this.handleOpenCurrentBidView = this.handleOpenCurrentBidView.bind(this);
        this.handleCloseCurrentBidView = this.handleCloseCurrentBidView.bind(this);
    }

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
                        <form className="newBidForm">
                            <label>Place bid:</label>
                            <input className="bidInput" />
                        </form>
                    </div> }
            </div>
        );
    }
}