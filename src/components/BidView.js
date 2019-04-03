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
        APIModule.GetBids("2067").then(function(response){ return response; }).then((data) => this.setState({ bids: data }));
    }

    handleOpenCurrentBidView(){
        this.props.handleShowBids();
    }

    handleCloseCurrentBidView(){
        this.props.handleCloseBids();
    }

    render(){
        let bids = this.state.bids.sort(function(a, b){
            return parseInt(b.Summa) - parseInt(a.Summa);
        });
        console.log(bids);
        bids = bids.map((bid) => 
            <div className="bid">
                <p className="bidText">{bid.Budgivare}</p>
                <p className="bidText">{bid.BudID}</p>
                <p className="bidText">{bid.Summa}kr</p>
            </div>
        );
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
                        {bids}
                    </div>
                </div> : null}
                <div className="showBidsText">
                    <p className="showBidsTag" onClick={this.handleOpenCurrentBidView}>Show bids</p>
                </div>
            </div>
        );
    }
}