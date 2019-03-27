import React from 'react';

async function GetAuctions(){
    let url = "http://nackowskis.azurewebsites.net/api/Auktion/7";
    return await fetch(url).then(function(response){ return response.json(); });
}

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { auctions: [] };
    }

    render(){
        if(this.state.auctions.length === 0){
            GetAuctions().then(function(promise){ return promise; }).then(data => this.setState({ auctions: data }));
        }
        let data = this.state.auctions;
        console.log(data);
        let auctions = data.map(auction => 
                <li key={auction.AuktionID}>{auction.Titel}</li>
            );
        return(
            <ul>
                {auctions}
            </ul>
        );
    }
}