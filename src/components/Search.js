import React from 'react';
import APIModule from '../modules';
import { Navbar } from './Navbar';

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = { auctions: [], searchValue: "", foundAuctions: [] };
        this.handleSearchValue = this.handleSearchValue.bind(this);
    }

    componentDidMount(){
        APIModule.GetAuctions().then(function(promise){ return promise; }).then(data => this.setState({ auctions: data }));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.searchValue !== this.state.searchValue){
            let currentAuctions = this.state.auctions;
            let value = this.state.searchValue;
            let auctionFound = currentAuctions.filter(function(auction){ return auction.Titel.toLowerCase().indexOf(value) !== -1});
            this.setState({ foundAuctions: auctionFound });
        }
    }

    handleSearchValue(value){
        this.setState({ searchValue: value });
        console.log(value);
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
                <Navbar searchValue={this.state.searchValue} onClick={this.handleSearchValue}/>
                <div className="searchContainer">
                    <ul className="searchResultList">
                        {auctions}
                    </ul>
                </div>
            </div>
        );
    }
}