import React from 'react';

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {  };
        this.handleDateChoice = this.handleDateChoice.bind(this);
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
                    <div className="auction-items-container">
                        {auctions}
                    </div>
                </div>
            </div>
        );
    }
}