import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import CreateAuction from './components/CreateAuction';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { APIModule } from './modules';

export default class AuctionApp extends React.Component{
    constructor(props){
        super(props);
        this.state = { auctions: [], searchValue: "" };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        APIModule.GetAuctions().then(function(promise){ return promise; }).then(data => this.setState({ auctions: data }));
    }

    onChange(value){
        this.setState({ searchValue: value });
    }

    render(){
        return (
            <BrowserRouter>
                <Navbar searchValue={this.state.searchValue} onChange={this.onChange} />
                <Route exact path="/" component={() => <StartPage auctions={this.state.auctions} />} />
                <Route path="/CreateAuction" component={() => <CreateAuction />} />
                <Route path="/Search" component={() => <Search auctions={this.state.auctions} searchValue={this.state.searchValue} />} />
            </BrowserRouter>
        );
    }
}