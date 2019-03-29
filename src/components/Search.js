import React from 'react';

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = { foundAuctions: [] };
    }

    componentDidMount(){
        let currentAuctions = this.props.auctions;
        let value = this.props.searchValue;
        let auctionFound = currentAuctions.filter(function(auction){ return auction.Titel.toLowerCase().indexOf(value) !== -1});
        this.setState({ foundAuctions: auctionFound });
    }

    componentDidUpdate(prevProps){
        if(prevProps.searchValue !== this.props.searchValue){
            let currentAuctions = this.props.auctions;
            let value = this.props.searchValue;
            console.log(currentAuctions);
            console.log(value);
            let auctionFound = currentAuctions.filter(function(auction){ return auction.Titel.toLowerCase().indexOf(value) !== -1});
            this.setState({ foundAuctions: auctionFound });
        }
    }

    render(){
        let auctions;
        if(this.state.foundAuctions.length === 0)
            auctions = (
                <li key="Error">
                    <h2>Ingen Auktion hittades</h2>
                    <p>Säker på att du skrev rätt?</p>
                </li>
            );
        else{
            auctions = this.state.foundAuctions.map(auction => 
                <li>
                    <h2>{auction.Titel}</h2>
                    <p>Auction ends at: {auction.SlutDatum.replace('T', ' ')}</p>
                    <h5>Price: {auction.Utropspris}</h5>
                </li>
            );
        }
        return (
            <div className="searchResults">
                <div className="searchContainer">
                    <ul className="searchResultList">
                        {auctions}
                    </ul>
                </div>
            </div>
        );
    }
}