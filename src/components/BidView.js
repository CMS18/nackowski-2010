import React from 'react';
import { APIModule } from '../modules';

export class BidView extends React.Component{
    constructor(props){
        super(props);
        this.state = { bids: [] };
        this.handleOpenCurrentBidView = this.handleOpenCurrentBidView.bind(this);
        this.handleCloseCurrentBidView = this.handleCloseCurrentBidView.bind(this);
    }

    componentDidMount(){
        APIModule.GetBids("2074").then(function(response){ return response; }).then((data) => this.setState({ bids: data }));
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
        if(auction.length !== 0){
            auctionDate = new Date(auction[0].SlutDatum.replace('T', ' '));
        }

        let bids = this.state.bids.sort(function(a, b){
            return parseInt(b.Summa) - parseInt(a.Summa);
        });
        let allBids = bids.map((bid) => 
            <div className="bid">
                <p className="bidText">{bid.Budgivare}</p>
                <p className="bidText">{bid.BudID}</p>
                <p className="bidText">{bid.Summa}kr</p>
            </div>
        );
        console.log(bids[0]);
        return (
            <div className="bidViewContent">
                {this.props.showBids ? <div className="currentBidViewBackdrop" onClick={this.handleCloseCurrentBidView}></div> : null}
                {this.props.showBids ? 
                <div className="currentBidViewContent">
                    <div className="bidHistoryHeader">
                        <div className="bidHistoryHeaderText">
                            <h5 className="bidHistoryText">Biddinghistory</h5>
                        </div>
                        <div className="closeButton">
                            <span onClick={this.handleCloseCurrentBidView}>X</span>
                        </div>
                    </div>
                    <div className="currentBids">
                        <p>Current bid count: {this.state.bids.length}</p>
                        <div className="bidInfoText">
                            <h4>Bidder:</h4>
                            <h4>Bid ID:</h4>
                            <h4>Bid:</h4>
                        </div>
                        {allBids}
                    </div>
                </div> : null}
                <div className="showBidsText">
                    <p className="showBidsTag" onClick={this.handleOpenCurrentBidView}>Show bids</p>
                </div>
                {+currentDate > +auctionDate ? 
                    <div className="showWinningBid">
                        <div className="winner">
                            {bids.length !== 0 ? 
                                <div className="winnerText">
                                    <h4>Bidder: {bids[0].Budgivare}</h4>
                                    <h4>Bid ID: {bids[0].BudID}</h4>
                                    <h4>Bid: {bids[0].Summa}</h4>
                                </div>

                            :
                            
                                <div className="winnerText">
                                    <h4>No bids were put on this auction.</h4>
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