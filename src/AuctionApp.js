import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import CreateAuction from './components/CreateAuction';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { DetailView } from './components/DetailView';
import { APIModule } from './modules';

<<<<<<< HEAD
export default class AuctionApp extends React.Component{
    constructor(props){
        super(props);
        this.state = { auctions: [], searchValue: "" };
        this.onChange = this.onChange.bind(this);
    }
=======
export default class AuctionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auctions: [], searchValue: '', bids: [] };
    this.onChange = this.onChange.bind(this);
  }
>>>>>>> 38409122b5d173ab0272823771e50c69e85b4e31

  componentDidMount() {
    APIModule.GetAuctions()
      .then(function(promise) {
        return promise;
      })
      .then(data => this.setState({ auctions: data }));
  }

  onChange(value) {
    this.setState({ searchValue: value });
  }

<<<<<<< HEAD
    render(){
        return (
            <BrowserRouter>
                <Navbar searchValue={this.state.searchValue} onChange={this.onChange} />
                <Route exact path="/" component={() => <StartPage auctions={this.state.auctions} />} />
                {this.state.auctions.map((auction) => ( <Route key={auction.AuktionID} path={"/DetailView/" + auction.Titel} component={() => <DetailView auctionID={auction.AuktionID} />} /> ))}
                <Route path="/CreateAuction" component={() => <CreateAuction />} />
                <Route path="/Search" component={() => <Search auctions={this.state.auctions} searchValue={this.state.searchValue} />} />
            </BrowserRouter>
        );
    }
}
=======
  render() {
    return (
      <BrowserRouter>
        <Navbar searchValue={this.state.searchValue} onChange={this.onChange} />
        <Route
          exact
          path="/"
          component={() => <StartPage auctions={this.state.auctions} />}
        />
        {this.state.auctions.map(auction => (
          <Route
            path={'/DetailView/' + auction.Titel}
            component={() => <DetailView auction={auction} />}
          />
        ))}
        <Route path="/CreateAuction" component={() => <CreateAuction />} />
        <Route
          path="/Search"
          component={() => (
            <Search
              auctions={this.state.auctions}
              searchValue={this.state.searchValue}
            />
          )}
        />
      </BrowserRouter>
    );
  }
}
>>>>>>> 38409122b5d173ab0272823771e50c69e85b4e31
