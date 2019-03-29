import React from 'react';
import withRouter from 'react-router-dom';

export class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = { searchValue: "" };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        let search = document.getElementById('searchField');
        this.props.onClick(search.value);
    }

    render(){
        return (
            <div className="navigation">
                <div className="logo">
                    <h1>LMG Auction</h1>
                </div>
                <div className="searchBar">
                    <input id="searchField" placeholder="Sök Auktion..." />
                    <button id="searchButton" aria-label="Search" onClick={this.onClick}><span aria-label="Search" role="img">&#128270;</span></button>
                </div>
                <div className="pageNavigation">
                    <h2>Create Auction</h2>
                </div>
            </div>
        );
    }
}