import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {  };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        let search = document.getElementById('searchField');
        this.props.onChange(search.value);
    }

    render(){
        return (
            <div className="navigation">
                <div className="logo">
                    <NavLink to="/">
                        <h1>LMG Auction</h1>
                    </NavLink>
                </div>
                <div className="searchBar">
                    <input id="searchField" placeholder="Sök Auktion..." />
                    <NavLink to="/Search">
                        <button id="searchButton" aria-label="Search" onClick={this.onClick}><span aria-label="Search" role="img">&#128270;</span></button>
                    </NavLink>
                </div>
                <div className="pageNavigation">
                    <NavLink to="/CreateAuction">
                        <h2>Create Auction</h2>
                    </NavLink>
                </div>
            </div>
        );
    }
}