export var APIModule = (function () {
  async function FetchBids(id) {
    let url = 'http://nackowskis.azurewebsites.net/api/Bud/2010/' + id;
    return await fetch(url).then(function (data) {
      return data.json();
    });
  }

  async function CreateBid(bid) {
    const url = 'http://nackowskis.azurewebsites.net/api/Bud/2010';
    const {
      auctionID,
      sum,
      bidder
    } = bid;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        AuktionID: auctionID,
        Summa: sum,
        Budgivare: bidder
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log('Request success: ', 'posten skapad');
    });
  }

  async function FetchAuctions() {
    let url = 'http://nackowskis.azurewebsites.net/api/Auktion/2010';
    return await fetch(url).then(function (data) {
      return data.json();
    });
  }

  async function CreateAuction(auction) {
    const url = 'http://nackowskis.azurewebsites.net/api/Auktion/2010';

    const {
      title,
      description,
      startDate,
      dueDate,
      acceptedPrice,
      createdBy
    } = auction;

    let start = new Date(startDate);
    start.setHours(startDate.getHours() + 2);
    let startDateString = start.toISOString().substring(0, 19);
    let end = new Date(dueDate);
    end.setHours(dueDate.getHours() + 2);
    let endDateString = end.toISOString().substring(0, 19);

    const body = JSON.stringify({
      Titel: title,
      Beskrivning: description,
      StartDatum: startDateString,
      SlutDatum: endDateString,
      Gruppkod: 2010,
      Utropspris: acceptedPrice,
      SkapadAv: createdBy
    });

    await fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log('Request success: ', 'posten skapad');
    });
  }

  async function UpdateAuction(auction) {
    const url =
      'http://nackowskis.azurewebsites.net/api/Auktion/2010/' +
      auction.AuktionID;

    var newauction = {
      AuktionID: auction.AuktionID,
      Titel: auction.Titel,
      Beskrivning: auction.Beskrivning,
      StartDatum: auction.StartDatum,
      SlutDatum: auction.SlutDatum,
      Gruppkod: 2010,
      Utropspris: auction.Utropspris,
      SkapadAv: auction.SkapadAv
    };

    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(newauction),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log('Request success: ', 'posten uppdaterad');
    });
  }

  async function DeleteAuction(auction) {
    const url =
      'http://nackowskis.azurewebsites.net/api/Auktion/2010?id=' +
      auction.AuktionID;
    var deleteAuction = {
      AuktionID: auction.AuktionID,
      Titel: auction.Titel,
      Beskrivning: auction.Beskrivning,
      StartDatum: auction.StartDatum,
      SlutDatum: auction.SlutDatum,
      Gruppkod: 2010,
      Utropspris: auction.Utropspris,
      SkapadAv: auction.SkapadAv
    };
    await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(deleteAuction),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(function (data) {
      console.log('Request success: ', 'posten borttagen');
    });
  }

  return {
    GetAuctions: FetchAuctions,
    GetBids: FetchBids,
    PostBid: CreateBid,
    PostAuction: CreateAuction,
    UpdateAuction: UpdateAuction,
    DeleteAuction: DeleteAuction
  };
})();
