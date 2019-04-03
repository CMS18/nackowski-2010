export var APIModule = (function () {
  async function FetchAuctions() {
    let url = 'http://nackowskis.azurewebsites.net/api/Auktion/1';
    return await fetch(url).then(function (data) {
      return data.json();
    });
  }

  async function FetchBids(id) {
    let url = 'http://nackowskis.azurewebsites.net/api/Bud/1/' + id;
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
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        Titel: title,
        Beskrivning: description,
        StartDatum: startDate,
        SlutDatum: dueDate,
        Gruppkod: 2010,
        Utropspris: acceptedPrice,
        SkapadAv: createdBy
      }),
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
    console.log(url)
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
    console.log('deleteAuction', deleteAuction);
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
    PostAuction: CreateAuction,
    UpdateAuction: UpdateAuction,
    DeleteAuction: DeleteAuction
  };
})();
