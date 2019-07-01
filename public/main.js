let lat, lon, chanceOfRain = 0;

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {

        lat = position.coords.latitude.toFixed(4);
        lon = position.coords.longitude.toFixed(4);
        const api_url = `weather/${lat},${lon}`

        const response = await fetch(api_url);
        const weather = await response.json();
        const forecast = weather.hourly.data

        for (let i = 0; i < 12; i++) {
            chanceOfRain += forecast[i].precipProbability

        }

        let totalChanceOfRain = chanceOfRain / 12;
        console.log(totalChanceOfRain)

        if (totalChanceOfRain > 5) {
            document.getElementById('rainOrNot').textContent = "Yep"
        } else {
            document.getElementById('rainOrNot').textContent = "nope"
        }

    })

}
