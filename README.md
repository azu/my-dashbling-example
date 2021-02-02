# dashbling Example

My [Dashbling](https://github.com/pascalw/dashbling) snapshot.

![img](./img.png)

## Usage

1. Set secret value to `.env` file

`.env`:

```
GITHUB_TOKEN=Your GitHub TOken
NATUREREMO_TOKEN=Your Nature Remo Token
# https://home.openweathermap.org/
OPEN_WEATHER_TOKEN==Your OPEN_WEATHER TOken
# Calender
ICAL_URL=Your ical URL
```

2. Edit `authToken` and `basicAuth` in [dashbling.config.js](./dashbling.config.js)
3. Launch via `yarn dev`

## Deploy

You can deploy to Heroku.

1. Create Heroku app
2. Integrate heroku app to GitHub App
3. Push it

`basicAuth` protect your dashboard by basic auth.

## Message API

right-bottom is a widget for your message.

```
curl -XPOST -H "Content-Type: application/json" \
                        -H "Authorization: bearer {your authToken value}" \
                        -d '{"message": "Your message "}' \
                        "http://localhost:3000/events/notification"
```

## Dev

    yarn dev
