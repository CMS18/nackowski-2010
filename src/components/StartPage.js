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