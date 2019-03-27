import React from 'react';
import APIModule from '../modules';

export class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = { foundAuctions: [] };
    }
    render(){
        if(this.state.foundAuctions.length === 0){
            APIModule.GetAuctions().then(function(promise){ return promise; }).then(data => this.setState({ foundAuctions: data }));
        }
        let auctionData = this.state.foundAuctions;
        let auctions = auctionData.map(auction => 
                <li>
                    <h2>{auction.Titel}</h2>
                    <p>Auction ends at: {auction.SlutDatum.replace('T', ' ')}</p>
                    <h5>Price: {auction.Utropspris}</h5>
                </li>
            );
        if(auctionData.length !== 0){
            
        }
        return (
            <div className="searchResults">
                <ul className="searchResultList">
                    {auctions}
                </ul>
            </div>
        );
    }
}