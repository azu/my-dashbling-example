const ical = require("node-ical");
const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.tz.setDefault("Asia/Tokyo");
module.exports = ({ ICAL_URL, eventLimit = 4, eventId }) =>
    async function calendar(sendEvent) {
        const webEvents = await ical.async.fromURL(ICAL_URL);
        const now = dayjs();
        const endDate = now.add(1, "day");
        const todayEvents = Object.values(webEvents)
            .filter((event) => {
                const startDay = dayjs(event.start);
                return startDay.isAfter(now) && startDay.isBefore(endDate);
            })
            .filter((event) => event.type === "VEVENT")
            .slice(0, eventLimit)
            .sort((a, b) => {
                return a.start - b.start;
            });
        sendEvent(eventId, {
            events: todayEvents
        });
    };
