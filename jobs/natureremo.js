const fetch = require("node-fetch");

module.exports = ({ NATUREREMO_TOKEN, OPEN_WEATHER_TOKEN, eventId }) =>
    async function natureRemo(sendEvent) {
        try {
            const response = await fetch("https://api.nature.global/1/devices", {
                headers: {
                    Authorization: `Bearer ${NATUREREMO_TOKEN}`
                }
            });
            const json = await response.json();
            const device = json[0];
            // 室温
            const temperature = device.newest_events.te.val;
            // 湿度
            const humidity = device.newest_events.hu.val;
            // 外の状態
            /*
            {"coord":{"lon":139.6917,"lat":35.6895},"weather":[{"id":800,"main":"Clear","description":"晴天","icon":"01d"}],"base":"stations","main":{"temp":10,"feels_like":4.13,"temp_min":10,"temp_max":10,"pressure":1024,"humidity":34},"visibility":10000,"wind":{"speed":4.63,"deg":330,"gust":9.77},"clouds":{"all":0},"dt":1612059666,"sys":{"type":1,"id":8077,"country":"JP","sunrise":1612042939,"sunset":1612080409},"timezone":32400,"id":1850144,"name":"東京都","cod":200}
             */
            const weatherResponse = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&APPID=${OPEN_WEATHER_TOKEN}&lang=ja&units=metric`
            ).then((res) => res.json());
            const data = {
                title: weatherResponse.weather[0]?.description,
                outerTemperature: weatherResponse.main.temp,
                outerMaxTemperature: weatherResponse.main.temp_max,
                outerMinTemperature: weatherResponse.main.temp_min,
                outerHumidity: weatherResponse.main.humidity,
                innerTemperature: temperature,
                innerHumidity: humidity
            };
            sendEvent(eventId, data);
        } catch (e) {
            console.warn("Failed", e);
        }
    };
