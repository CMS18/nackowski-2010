import React from 'react';
import { NavLink } from 'react-router-dom';
import { APIModule } from '../modules';

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {  selectedOption: "Valid", bids: [], auctions: [], filteredAuctions: []};
        this.handleOptionChange = changeEvent => {
            this.setState({
              selectedOption: changeEvent.target.value
            });
            this.handleStartPageRadioButtons(this.state.selectedOption);
          };
        this.GetLastBid = this.GetLastBid.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.GetBids = this.GetBids.bind(this);
        this.GetUtropspris = this.GetUtropspris.bind(this);
        this.GetHighestPriceFirst = this.GetHighestPriceFirst.bind(this);
        this.Get24hAuctions = this.Get24hAuctions.bind(this);
        this.handleStartPageRadioButtons = this.handleStartPageRadioButtons.bind(this);
    }

    componentDidMount(){
        window.scroll(0, 0);
        this.props.auctions.map((auction) => (
            APIModule.GetBids(auction.AuktionID)
            .then(function(promise){
                return promise;
            })
            .then((data) => 
            (
                this.setState(
                    {
                        bids: this.state.bids.concat(data)
                    }
                ))
            )
        ));
        let filtered = [];
        let shortTime = [];
        let shortTimeSorted = [];
        console.log(this.props.auctions);
        if(this.props.auctions.length !== 0){
            let currentDate = new Date();
            filtered = this.props.auctions.filter(function(auction){ 
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return +currentDate < +auctionDate;
            });

            shortTime = filtered.filter(function(auction){
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return (+auctionDate - +currentDate) < (86400000 * 7);
            });

            shortTimeSorted = shortTime.sort(function(a, b){
                let firstDate = new Date(a.SlutDatum.replace('T', ' '));
                let secondDate = new Date(b.SlutDatum.replace('T', ' '));
                return +firstDate - +secondDate;
            });
            console.log(shortTimeSorted);

            this.setState(
                {
                    filteredAuctions: shortTimeSorted
                }
            );
        }
        
    }

    GetLastBid(id){
        let bidsArray = this.state.bids;
        let lastBid = -1;

        bidsArray.forEach((bid) => {
            if (bid.AuktionID === id){
                lastBid = bid;
            }
        });
        console.log("LASTBID IN GetLastBid-func(): "+lastBid);

        return lastBid;
    }

    GetBids(id){
        let theBid;
        let bidsArray = this.state.bids;
        for (let outer=0; outer<bidsArray.length; outer++){
            if (this.state.bids[outer][0].AuktionID === id){
                theBid = this.state.bids[outer];
            }
        }
        return theBid;
    }

    GetUtropspris(id){ // TODO: Returnerar -1 vid felaktigt
        let utropspris = -1;
        this.state.auctions.forEach( auc => {
            if (auc.AuktionID === id){
                utropspris = auc.Utropspris;
            }
        });
        return utropspris;
    }

    GetLastBidVersionTwo(id){
        return undefined;
    }

    CreateUltimateAuctionArray(auc){
        let UltimateAuctionArray = [];
        for (let i=0; i<auc.length; i++)
        {
            console.log(auc[i].AuktionID);
            UltimateAuctionArray = UltimateAuctionArray.concat(Array(auc[i]).concat(this.GetLastBid(auc[i].AuktionID)));
        }
        console.log("UltimateAuctionArray: "+UltimateAuctionArray);
        return UltimateAuctionArray;
    }

    GetHighestPriceFirst2(auctions){
        
        let UltimateAuctionArray = this.CreateUltimateAuctionArray(auctions);

        let newOrder = UltimateAuctionArray.sort(function(a,b){
            return b[1] > a[1];
        });
        return newOrder;
    }

    GetHighestPriceFirst(auctions){
        console.log("GetHighestPriceFirst: "+JSON.stringify(this.state.bids));
        console.log("HIGHEST");
        let highestBids = [];
            auctions.forEach(auc => {
                highestBids= [
                    ...highestBids,
                    this.GetBids(auc.AuktionID)
                  ];
            });
        let newAuctionsOrder = auctions;
        newAuctionsOrder = newAuctionsOrder.sort(this.MySortHighest());

        return newAuctionsOrder;
    }
    
    Get24hAuctions(auctions){
        let testAuctions = [];
        let shortTime = [];
        let shortTimeSorted = [];
        if(auctions.length !== 0){
            let currentDate = new Date();
            testAuctions = auctions.filter(function(auction){ 
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return +currentDate < +auctionDate;
            });

            shortTime = testAuctions.filter(function(auction){
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return (+auctionDate - +currentDate) < (86400000 * 7);
            });

            shortTimeSorted = shortTime.sort(function(a, b){
                let firstDate = new Date(a.SlutDatum.replace('T', ' '));
                let secondDate = new Date(b.SlutDatum.replace('T', ' '));
                return +firstDate - +secondDate;
            });
            console.log(shortTimeSorted);
        }
        
        return shortTimeSorted;
    }   

    /* Handpicked Acutions */
    FilterHandpicked(){
        let filtered = this.FilterByValidAuctions(this.GetMostBidsFirst());
        this.setState(
            {filteredAuctions: filtered}
        )
    }

    /* Acutions with short time Left (24h) */
    FilterShortTimeLeft(){
        let filtered = this.Get24hAuctions(this.props.auctions);
        this.setState(
            {filteredAuctions: filtered}
        )
    }

    handleStartPageRadioButtons(value){
        let radioOne = document.getElementById('ValidDates');
        let radioTwo = document.getElementById('InvalidDates');
        if (value === "Valid"){
            radioOne.style.backgroundColor = "white";
            radioTwo.style.backgroundColor = "darkslategrey";
            this.FilterHandpicked();
            console.log("HANDPICKED");
        }
        else if (value === "Invalid"){
            radioOne.style.backgroundColor = "darkslategrey";
            radioTwo.style.backgroundColor = "white";
            this.FilterShortTimeLeft();
            console.log("ShortTimeLeft");
        }
    }


    GetMostBidsFirst(){
        let aucutionOrderByMostBids
        let currentBids = this.state.bids;
        if((this.state.bids.length !== 0) && (this.props.auctions.length !== 0)){
            aucutionOrderByMostBids = this.props.auctions.sort(function(a, b){
                let first = currentBids.filter(function(bid){ return bid.AuktionID === a.AuktionID });
                let second = currentBids.filter(function(bid){ return bid.AuktionID === b.AuktionID });
                return second.length - first.length;
            });
        }
        return aucutionOrderByMostBids;
    }

    GetNrOfBidsForThisAuction(id){
        return this.state.bids.filter(function(bid){ return bid.AuktionID === id }).length;
    }

    FilterByValidAuctions(auctions){
        if(this.props.auctions.length !== 0){
            let currentDate = new Date();
            auctions = auctions.filter(function(auction){
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return +currentDate < auctionDate });
        }
        return auctions;
    }

    LastBidOrUtropspris(id){
        let value = this.GetLastBid(id)
        if (value === -1){
            value = this.props.auctions.filter((auction) => {
                if (auction.AuktionID === id){
                    return auction.Utropspris;
                }
                return false;
            })
            console.log("VALUE[0]: "+value[0]+", length: "+value.length);
            return value[0];
        }
        console.log("VALUE: "+value)
        return value;
    }

    render(){
        let auctions = [];
        if(this.state.filteredAuctions.length !== 0){
            auctions = this.state.filteredAuctions.map((auction) =>
                    (<li className="foundAuctions" key={auction.AuktionID}>
                        <NavLink className="foundAuctionLinks" to={"/DetailView/" + auction.AuktionID}>
                            <h2>{auction.Titel}</h2>
                            <p>Slutar: {auction.SlutDatum.replace('T', ' ')}</p>
                            <h5>Utropspris: {auction.Utropspris}</h5>
                            <h5>{this.GetNrOfBidsForThisAuction(auction.AuktionID)} bud</h5>
                        </NavLink>
                    </li>)
            )
        }
        else{
            auctions = (
                <li className="Error">
                    <h2>Inga auktioner hittades</h2>
                    <p>Det finns för tillfället inga auktioner som matchar filtret.</p>
                </li>
            );
        }
        return(
            <div className="startPage-Items">
                <div className="startPageContent">
                    <div className="siteInfo">
                        <h1 id="StartPage-h1">Välkommen till LMG Auktion – en av Världens största marknadsplatser</h1>
                        <p id="p-tag-under-h1">Här shoppar du hållbart bland miljontals unika saker och fynd</p>
                        <h2>Trendar på LMG</h2>
                    </div>
                    <div className="dateChoicesStart">
                            <p className="currentText">Kort tid kvar!</p>
                            <p className="oldText">Populära auktioner</p>
                    </div>
                        
                    <div className="dateCheck">

                        <div id="ValidDates" className="validDates"> {/* Handpicked */}
                            <input
                            id="Valid"
                            checked={this.state.selectedOption === "Valid"}
                            onChange={this.handleOptionChange}
                            className="radioButtons"
                            type="radio"
                            name="date"
                            value="Valid"
                            defaultChecked />
                        </div>

                        <div id="InvalidDates" className="invalidDates"> {/* Short time left */}
                            <input
                                id="Invalid"
                                checked={this.state.selectedOption === "Invalid"}
                                onChange={this.handleOptionChange}
                                className="radioButtons"
                                type="radio"
                                name="date"
                                value="Invalid"
                                />
                        </div>
                    </div>
                    <div className="items">
                        <div className="auction-items-container">
                            {auctions}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}