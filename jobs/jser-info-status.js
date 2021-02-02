const fetch = require("node-fetch");
const { JSerStat } = require("jser-stat");

module.exports = ({ eventId }) =>
    async function jserInfoStatus(sendEvent) {
        try {
            const [posts, items] = await Promise.all([
                fetch("https://jser.info/posts.json").then(res => res.json()),
                fetch("https://jser.info/source-data/items.json").then(res => res.json())
            ]);
            const jSerStat = new JSerStat(items, posts);
            const jSerWeeks = jSerStat.getJSerWeeks();
            const latestWeek = jSerWeeks[jSerWeeks.length - 1];
            const now = new Date();
            const endDate = latestWeek.endDate;
            const unpublishedItems = jSerStat.findItemsBetween(endDate, now);
            const event = {
                count: unpublishedItems.length,
            };
            sendEvent(eventId, event);
        } catch (e) {
            console.warn(`Failed to fetch JSer.info status`, e);
        }
    };
