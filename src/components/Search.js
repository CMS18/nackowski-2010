import React from 'react';

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = { foundAuctions: [] };
        this.handleDateChoice = this.handleDateChoice.bind(this);
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

    handleDateChoice(e){
        let radioOne = document.getElementById('ValidDates');
        let radioTwo = document.getElementById('InvalidDates');

        if(radioOne.style.backgroundColor !== "black"){
            radioOne.style.backgroundColor = "black";
            radioOne.style.color = "white";
            radioTwo.style.backgroundColor = "white";
            radioTwo.style.color = "black";

            //DateSort Current
        }
        else{
            radioOne.style.backgroundColor = "white";
            radioOne.style.color = "black";
            radioTwo.style.backgroundColor = "black";
            radioOne.style.color = "white";

            //DateSort Old
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
                <li className="foundAuctions" key={auction.AuktionID}>
                    <h2>{auction.Titel}</h2>
                    <p>Auction ends at: {auction.SlutDatum.replace('T', ' ')}</p>
                    <h5>Price: {auction.Utropspris}</h5>
                </li>
            );
        }
        return (
            <div className="searchResults">
                <div className="dateChoices">
                    <p className="currentText">Current Auctions</p>
                    <p className="oldText">Old Auctions</p>
                </div>
                <div className="dateCheck">
                    <div id="ValidDates" className="validDates">
                        <input id="Valid" onClick={this.handleDateChoice} className="radioButtons" type="radio" name="date" defaultChecked />
                    </div>
                    <div id="InvalidDates" className="invalidDates">
                        <input id="Invalid" onClick={this.handleDateChoice} className="radioButtons" type="radio" name="date" />
                    </div>
                </div>
                <div className="searchContainer">
                    <ul className="searchResultList">
                        {auctions}
                    </ul>
                </div>
            </div>
        );
    }
}