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
        const forecast = weather.hourly.data.slice(0, 12); // return first 12 hours of forecast

        const chanceOfRain = await returnProcessedWeather.rain(forecast) // 

        await coat(chanceOfRain, showMap(lat, lon))

    })

}

function coat(chanceOfRain, callback) {
    if (chanceOfRain > 60) {
        var rainOrnot = "Yep"
    } else if (chanceOfRain > 30) {
        var rainOrnot = "Mmm, maybe"
    } else {
        var rainOrnot = "Nope"
    }

    let rainMessage = `
        <h2>${rainOrnot}<h2>
        <h3>${chanceOfRain}% chance of rain</h3>
        <p>over the next 12 hours</p>
    `

    const target = document.querySelector('#answer')
    const umbrella = document.querySelector('#umbrella')

    const strokeLength = umbrella.getTotalLength()
    const newStrokeLength = Math.floor((strokeLength - (chanceOfRain / 100) * strokeLength)) - 1;

    target.innerHTML = rainMessage;

    setTimeout(() => {
        target.classList.add('in-view')
        umbrella.style.strokeDashoffset = 0
        setTimeout(() => { umbrella.style.strokeDashoffset = newStrokeLength }, 0)
        // umbrella.style.strokeDashoffset = newStrokeLength
        umbrella.classList.remove('is-loading')

        callback()
    }, 0)

}

const returnProcessedWeather = {

    rain: (weather) => {

        for (let i = 0; i < 12; i++) {
            chanceOfRain += weather[i].precipProbability;
        }

        return totalChanceOfRain = (chanceOfRain / 12).toFixed(2) * 100;
    },

    temp: (weather) => {

    }
}

function showMap(lat, lon) {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/oajmeredith23/cjw0tt4531mit1cnvqvsu9x6a',
        center: [lon, lat],
        zoom: 12
    });


}


