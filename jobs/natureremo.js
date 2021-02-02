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
