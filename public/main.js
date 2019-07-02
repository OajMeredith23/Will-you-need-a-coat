let lat, lon, chanceOfRain = 0, temp = [];


mapboxgl.accessToken =
    'pk.eyJ1Ijoib2FqbWVyZWRpdGgyMyIsImEiOiJjanZzM3ZxYW4yc25xNDRtZ25rcjJvbmRyIn0.6vRe5vbyV0NJ83oOVWdnMQ';





if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {

        lat = position.coords.latitude.toFixed(4);
        lon = position.coords.longitude.toFixed(4);
        const api_url = `weather/${lat},${lon}`

        const response = await fetch(api_url);
        const weather = await response.json();
        const forecast = weather.hourly.data
        console.log(forecast)
        for (let i = 0; i < 12; i++) {
            chanceOfRain += forecast[i].precipProbability;
            temp.push(forecast[i].apparentTemperature)
        }
        console.log(temp)

        let totalChanceOfRain = chanceOfRain / 12;

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let totalTemp = (((temp.reduce(reducer) / 12) - 32) / 1.8).toFixed(2);


        if (totalChanceOfRain > 5) {
            var rainOrnot = "Yep"
        } else {
            var rainOrnot = "Nope"
        }

        let rainMessage = `<h2>${rainOrnot}<h2><h3>there's a ${totalChanceOfRain * 100}% chance of rain over the next 12 hours</h3>`
        document.getElementById('rain').innerHTML = rainMessage

        if (totalTemp > 20) {
            var jacketOrNot = "Probably not"
        } else {
            var jacketOrNot = "I should think so"
        }
        let jackMessage = `<h2>${jacketOrNot}<h2><h3>it's averaging ${totalTemp}° over the next 12 hours</h3>`
        document.getElementById('jacket').innerHTML = jackMessage;


        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/oajmeredith23/cjw0tt4531mit1cnvqvsu9x6a',
            center: [lon, lat],
            zoom: 9
        });


    })

}
