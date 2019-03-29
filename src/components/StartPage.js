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
                <div className="auction-item" key={auction.AuktionID}><p>{auction.Titel}</p></div>
            );
        return(
            <div className="startPage-Items">
                <div className="items">
                    <h1 id="StartPage-h1">Välkommen till Nackowskis – en av Världens största marknadsplatser</h1>
                    <p id="p-tag-under-h1">Här shoppar du hållbart bland miljontals unika saker och fynd</p>
                    <h2>Trendar på Nackowskis</h2>
                    <div className="auction-items-container">
                        {auctions}
                    </div>
                </div>
            </div>
        );
    }
}