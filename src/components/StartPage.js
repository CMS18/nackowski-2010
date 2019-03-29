import React from 'react';

async function GetAuctions(){
    let url = "http://nackowskis.azurewebsites.net/api/Auktion/1";
    return await fetch(url).then(function(response){ return response.json(); });
}

async function GetBids(auktionsId){
    let url = "http://nackowskis.azurewebsites.net/api/Bud/1/"+auktionsId+"";
    return await fetch(url).then(function(response){ return response.json(); });
}

function getTrendingAuctions(state){
        
    GetAuctions().then(function(promise){ return promise; }).then(data => state.bids = data );

    let data = state.bids;

    let auctionIds = [];
    for (let i=0; i<data.length; i++){
        auctionIds.push(data[i].AuktionID);
    }

    let newData = [];
    for (let i=0; i<auctionIds.length; i++){
        newData.push(GetBids(auctionIds[i]));
    }
    return newData;
}

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            auctions: [],
            bids: []
        };
    }

    getMostUrgentAuctions(){

    }

    getOldestAuctions(){
        return null;
    }

    render(){
        /**let data;
        if(this.state.auctions.length === 0){
            data = getTrendingAuctions(this.state);
        } */
        if(this.state.auctions.length === 0){
            GetAuctions().then(function(promise){ return promise; }).then(data => this.setState({ auctions: data }));
        }
        let data = this.state.auctions;
        
        
        console.log(data);

        let auctions = data.map(auction => 
                <div class="auction-item" key={auction.AuktionID}><p>{auction.Titel}</p></div>
            );
        return(
            <div>
                <h1 id="StartPage-h1">Välkommen till Nackowskis – en av Världens största marknadsplatser</h1>
                <p id="p-tag-under-h1">Här shoppar du hållbart bland miljontals unika saker och fynd</p>
                <h2>Trendar på Nackowskis</h2>
                <div class="auction-items-container">
                    {auctions}
                </div>
            </div>
        );
    }
}