import React from 'react';

export class DetailView extends React.Component{
    constructor(props){
        super(props);
        this.state = {  };
    }
    render(){
        return (
            <div className="detailViewContent">
                <h2>{this.props.auctionID}</h2>
            </div>
        );
    }
}