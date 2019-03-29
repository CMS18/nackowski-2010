import React from 'react';

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {  };
    }

    render(){
        let data = this.props.auctions;
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