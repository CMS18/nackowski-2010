export var APIModule = (function(){

    async function FetchAuctions(){
        let url = 'http://nackowskis.azurewebsites.net/api/Auktion/1';
        return await fetch(url).then(function(data){ return data.json(); });
    }

    async function FetchBids(id){
      let url = 'http://nackowskis.azurewebsites.net/api/Bud/1/'+id;
      return await fetch(url).then(function(data){return data.json();});
    }

    async function createAuction(auction){
        const url = "http://nackowskis.azurewebsites.net/api/Auktion/2010";
        const {
          title,
          description,
          startDate,
          dueDate,
          acceptedPrice,
          createdBy
        } = auction;
        fetch(url, {
          method: "POST",
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
            "Content-Type": "application/json"
          }
        }).then(function(data) {
          console.log("Request success: ", "posten skapad");
        });
    }

    return { GetAuctions: FetchAuctions, GetBids: FetchBids, PostAuction: createAuction };
})();