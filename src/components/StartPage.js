import React from 'react';
import { APIModule } from '../modules';

function GetShortestTimeLeft(auctions){
    console.log("GetShortestTimeLeft-func");
    return auctions;
}

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { selectedOption: "Valid", bids: [], filteredAuctions: [] };
        this.handleDateChoice = this.handleDateChoice.bind(this);
        /*this.handleOptionChange = changeEvent => {
            this.setState({
              selectedOption: changeEvent.target.value
            });
            this.handleStartPageRadioButtons(this.state.selectedOption);
        };*/
    }

    componentDidMount(){
        this.props.auctions.map((auction) => (APIModule.GetBids(auction.AuktionID).then(function(promise){ return promise; }).then((data) => this.setState({ bids: this.state.bids.concat(data) }) )));
        let filtered = [];
        let shortTime = [];
        let shortTimeSorted = [];
        if(this.props.auctions.length !== 0){
            let currentDate = new Date();
            filtered = this.props.auctions.filter(function(auction){ 
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return +currentDate < +auctionDate; 
            });

            shortTime = filtered.filter(function(auction){
                let auctionDate = new Date(auction.SlutDatum.replace('T', ' '));
                return (+auctionDate - +currentDate) < 86400000;
            });

            console.log(shortTime);

            shortTimeSorted = shortTime.sort(function(a, b){
                let firstDate = new Date(a.SlutDatum.replace('T', ' '));
                let secondDate = new Date(b.SlutDatum.replace('T', ' '));
                return +firstDate - +secondDate;
            });
            console.log(shortTimeSorted);
            this.setState({ filteredAuctions: shortTimeSorted });
        }
        else{
            this.setState({ filteredAuctions: filtered });
        }
    }

    GetHighestPriceFirst(auctions){
        console.log("GetHighestPriceFirst-func");
        let orderdAuctions = [];
        console.log("Auctions: "+auctions);
        auctions.forEach(auc => {
            orderdAuctions.push(this.state.bids.filter(function(bid){
                
            }));
            console.log("Orderd Auctions: "+orderdAuctions[0]);
        });
        let newoOderdAuctions = orderdAuctions.sort(
            function(a, b) {
                return b.Summa < a.Summa; // Högst först
            }
        );
        console.log(newoOderdAuctions);  
        return newoOderdAuctions;
    }

    handleStartPageRadioButtons(value){
        let radioOne = document.getElementById('ValidDates');
        let radioTwo = document.getElementById('InvalidDates');

        console.log("Do I even get here??");

        if (value === "Valid"){
            radioOne.style.backgroundColor = "white";
            radioTwo.style.backgroundColor = "black";
        }
        else if (value === "Invalid"){
            radioOne.style.backgroundColor = "black";
            radioTwo.style.backgroundColor = "white";
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
        }
        else{
            radioOne.style.backgroundColor = "white";
            radioOne.style.color = "black";
            radioTwo.style.backgroundColor = "black";
            radioOne.style.color = "white";
        }
    }

    render(){
        let auctions;
        // if (this.state.selectedOption === "Valid"){ // Handpicked
        //     /*GetHighestPrice
        //     GetShortestTimeLeft*/
        //     console.log("PROPS: "+this.props.auctions);
        //     let data = this.GetHighestPriceFirst(this.props.auctions);
        // let test = testAuctions.map(function(auction){
        //     let sorted = this.state.bids.sort(function(a,b){
        //         return parseInt(b.Summa) - parseInt(a.Summa);
        //     });
        //     return (
        //     <div>
        //         <h1>{auction.Titel}</h1>
        //         <h2>Highest price: {sorted[0].Summa}</h2>
        //     </div>)
        // });
        // let currentBids = this.state.bids;
        // if(this.state.bids.length !== 0){
        //     let test2 = testAuctions.sort(function(a, b){
        //         let first = currentBids.filter(function(bid){ return bid.AuktionID === a.AuktionID });
        //         let second = currentBids.filter(function(bid){ return bid.AuktionID === b.AuktionID });
        //         return second.length - first.length;
        //     });
        //     console.log(test2);
        // }
        console.log(this.state.filteredAuctions);
        auctions = this.state.filteredAuctions.map(auction =>
            <div className="auction-item" key={auction.AuktionID}><p>{auction.Titel}</p></div>
        );
        // let bids = this.state.bids.map((bid) => 
        //     <div>
        //         <h2>Summa: {bid.Summa}</h2>
        //     </div>
        // );
        // }
        // else if (this.state.selectedOption === "Invalid"){ // Short time left
        //     let data = GetShortestTimeLeft(this.props.auctions);
        //     auctions = data.map(auction => 
        //         <div className="auction-item" key={auction.AuktionID}><p>{auction.Titel}</p></div>
        //     );
        // }
            /*
                <div className="dateCheck">
                    <div id="ValidDates" className="validDates">
                        <input
                        id="Valid"
                        onClick={this.handleDateChoice}
                        className="radioButtons"
                        type="radio"
                        name="date"
                        defaultChecked />
                    </div>
                    <div id="InvalidDates" className="invalidDates">
                        <input id="Invalid" onClick={this.handleDateChoice} className="radioButtons" type="radio" name="date" />
                    </div>
                </div>
            */
        return(
            <div className="startPage-Items">
                <div className="items">
                    <h1 id="StartPage-h1">Välkommen till Nackowskis – en av Världens största marknadsplatser</h1>
                    <p id="p-tag-under-h1">Här shoppar du hållbart bland miljontals unika saker och fynd</p>
                    <h2>Trendar på Nackowskis</h2>
                    <div className="dateChoices">
                        <p className="currentText">Hand picked</p>
                        <p className="oldText">Short time left</p>
                    </div>
                    
                    <div className="dateCheck">

                        <div id="ValidDates" className="validDates"> {/* Handpicked */}
                            <input
                            id="Valid"
                            /* onClick={this.handleDateChoice} */
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
                                /* onClick={this.handleDateChoice} */
                                checked={this.state.selectedOption === "Invalid"}
                                onChange={this.handleOptionChange}
                                className="radioButtons"
                                type="radio"
                                name="date"
                                value="Invalid"
                                />
                        </div>

                    </div>

                    <div className="auction-items-container">
                        {auctions}
                    </div>
                </div>
            </div>
        );
    }
}