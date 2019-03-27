var APIModule = (function(){
    async function FetchAuctions(){
        let url = 'http://nackowskis.azurewebsites.net/api/Auktion/7';
        return await fetch(url).then(function(data){ return data.json(); });
    }

    return { GetAuctions: FetchAuctions };
})();

export default APIModule;