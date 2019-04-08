import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { foundAuctions: [], showBids: false, selAuction: [] };
        this.handleValidDateChoice = this.handleValidDateChoice.bind(this);
        this.handleInvalidDateChoice = this.handleInvalidDateChoice.bind(this);
        this.handleCloseBids = this.handleCloseBids.bind(this);
        this.handleShowBids = this.handleShowBids.bind(this);
    }

    componentDidMount() {
        window.scroll(0, 0);
        let currentAuctions = this.props.auctions;
        let value = this.props.searchValue;
        let auctionFound = currentAuctions.filter(function (auction) { return auction.Titel.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
        let validAuctions = auctionFound.filter(function (auction) {
            let todaysDate = new Date();
            let dueDate = new Date(auction.SlutDatum.replace('T', ' '));
            return +todaysDate < +dueDate;
        });
        let sortedValidAuctions = validAuctions.sort(function(a, b){
            let firstDate = new Date(a.SlutDatum.replace('T', ' '));
            let secondDate = new Date(b.SlutDatum.replace('T', ' '));
            return +firstDate - +secondDate;
        });
        this.setState({ foundAuctions: sortedValidAuctions });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchValue !== this.props.searchValue) {
            let currentAuctions = this.props.auctions;
            let value = this.props.searchValue;
            let auctionFound = currentAuctions.filter(function (auction) { return auction.Titel.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
            this.setState({ foundAuctions: auctionFound });
        }
    }

    handleShowBids() {
        let root = document.getElementById('root');
        root.classList.add('removeScrollbar');
        this.setState({ showBids: true });
    }

    handleCloseBids() {
        let root = document.getElementById('root');
        root.classList.remove('removeScrollbar');
        this.setState({ showBids: false });
    }

    handleValidDateChoice(e) {
        let radioOne = document.getElementById('ValidDates');
        let radioTwo = document.getElementById('InvalidDates');
        radioOne.style.backgroundColor = "darkslategrey";
        radioTwo.style.backgroundColor = "white";
        let value = this.props.searchValue;
        let auctionFound = this.props.auctions.filter(function (auction) { return auction.Titel.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
        let validAuctions = auctionFound.filter(function (auction) {
            let todaysDate = new Date();
            let dueDate = new Date(auction.SlutDatum.replace('T', ' '));
            return +todaysDate < +dueDate;
        });
        let sortedValidAuctions = validAuctions.sort(function(a, b){
            let firstDate = new Date(a.SlutDatum.replace('T', ' '));
            let secondDate = new Date(b.SlutDatum.replace('T', ' '));
            return +firstDate - +secondDate;
        });
        this.setState({ foundAuctions: sortedValidAuctions });
    }

    handleInvalidDateChoice(e) {
        let radioOne = document.getElementById('ValidDates');
        let radioTwo = document.getElementById('InvalidDates');
        radioOne.style.backgroundColor = "white";
        radioTwo.style.backgroundColor = "darkslategrey";
        let value = this.props.searchValue;
        let auctionFound = this.props.auctions.filter(function (auction) { return auction.Titel.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
        let invalidAuctions = auctionFound.filter(function (auction) {
            let todaysDate = new Date();
            let dueDate = new Date(auction.SlutDatum.replace('T', ' '));
            return +todaysDate > +dueDate;
        });
        let sortedInvalidAuctions = invalidAuctions.sort(function(a, b){
            let firstDate = new Date(a.SlutDatum.replace('T', ' '));
            let secondDate = new Date(b.SlutDatum.replace('T', ' '));
            return +secondDate - +firstDate;
        });
        this.setState({ foundAuctions: sortedInvalidAuctions });
    }

    render() {
        let auctions;
        if (this.state.foundAuctions.length === 0)
            auctions = (
                <li key="Error">
                    <h2>Ingen Auktion hittades</h2>
                    <p>Säker på att du skrev rätt?</p>
                </li>
            );
        else {
            auctions = this.state.foundAuctions.map(auction =>

                <li className="foundAuctions" key={auction.AuktionID}>
                    <NavLink className="foundAuctionLinks" to={"/DetailView/" + auction.AuktionID}>
                        <h2>{auction.Titel}</h2>
                        <p>Slutar: {auction.SlutDatum.replace('T', ' ')}</p>
                        <h5>Utropspris: {auction.Utropspris}</h5>
                    </NavLink>
                </li>
            );
        }
        return (
            <div className="search">
                <div className="searchResults">
                    <div className="dateChoices">
                        <p className="currentText">Aktuella auktioner</p>
                        <p className="oldText">Gamla auktioner</p>
                    </div>
                    <div className="dateCheck">
                        <div id="ValidDates" className="validDates">
                            <input id="Valid" onClick={this.handleValidDateChoice} className="radioButtons" type="radio" name="date" defaultChecked />
                        </div>
                        <div id="InvalidDates" className="invalidDates">
                            <input id="Invalid" onClick={this.handleInvalidDateChoice} className="radioButtons" type="radio" name="date" />
                        </div>
                    </div>
                    <div className="searchContainer">
                        <ul className="searchResultList">
                            {auctions}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}