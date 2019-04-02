import React from 'react';

export class BidView extends React.Component{
    constructor(props){
        super(props);
        this.state = { showBids: false, bids: [] };
        this.handleOpenCurrentBidView = this.handleOpenCurrentBidView.bind(this);
        this.handleCloseCurrentBidView = this.handleCloseCurrentBidView.bind(this);
    }

    handleOpenCurrentBidView(){
        this.setState({ showBids: true });
    }

    handleCloseCurrentBidView(){
        this.setState({ showBids: false });
    }

    render(){
        return (
            <div className="bidViewContent">
                {this.state.showBids ? <div className="currentBidViewBackdrop" onClick={this.handleCloseCurrentBidView}></div> : null}
                {this.state.showBids ? 
                <div className="currentBidViewContent">

                </div> : null}
                <div className=""></div>
            </div>
        );
    }
}