import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import CreateAuction from './components/CreateAuction';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { DetailView } from './components/DetailView';
import { APIModule } from './modules';
import { AuctionFooter } from './components/AuctionFooter';

export default class AuctionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auctions: [], searchValue: "", statusUpdated: false };
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    APIModule.GetAuctions()
      .then(function (promise) {
        return promise;
      })
      .then(data => this.setState({ auctions: data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.statusUpdated !== this.state.statusUpdated) {
      APIModule.GetAuctions()
        .then(function (promise) {
          return promise;
        })
        .then(data => this.setState({ auctions: data }));
    }
  }

  onUpdate(status) {
    this.setState({ statusUpdated: status });
  }

  onChange(value) {
    this.setState({ searchValue: value });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="pageContent">
          <Navbar searchValue={this.state.searchValue} onChange={this.onChange} />
          <Route
            exact
            path="/"
            component={() => <StartPage auctions={this.state.auctions} />}
          />
          {this.state.auctions.map(auction => (
            <Route
              key={auction.AuktionID}
              path={'/DetailView/' + auction.AuktionID}
              component={() => <DetailView auction={auction} statusUpdated={this.onUpdate} status={this.state.statusUpdated} />}
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
          <AuctionFooter />
        </div>
      </BrowserRouter>
    );
  }
}
