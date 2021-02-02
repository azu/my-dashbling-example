const JapaneseHolidays = require('japanese-holidays');
const { graphql } = require("@octokit/graphql");
/**
 * @param {{ type: "daily" | "work", GITHUB_TOKEN:string, itemLimit: number }}
 */
const fetchDaily = async ({ type, GITHUB_TOKEN, itemLimit }) => {
    const projectNumber = type === "daily" ? 2 : 3;
    const query = `
query { 
  repository(owner:"yourname" name:"your-repo") {
    project(number: ${projectNumber}){
      columns(first: 10){
        nodes {
          name
          cards(archivedStates: NOT_ARCHIVED) {
            nodes {
              content {
                ... on Issue{
                  title
                  url
                }
                ... on PullRequest{
                  title
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}`

    const response = await graphql(query, {
        headers: {
            authorization: `token ${GITHUB_TOKEN}`,
        },
    });
    /**
     * @type {import("@octokit/graphql-schema").Repository}
     */
    const repository = response.repository
    const todoColumn = repository.project.columns.nodes.find(column => column.name === "TODO");
    if (!todoColumn) {
        throw new Error("TODOのカラムがない");
    }
    // タイトルの [] を削る
    return todoColumn.cards.nodes.slice(0, itemLimit).map(node => node.content).map(node => {
        return {
            title: node.title.replace(/^\[.*?](.*?)/, "$1").trim(),
            url: node.url
        }
    });
}
module.exports = ({ GITHUB_TOKEN, eventId }) =>
    async function githubProject(sendEvent) {
        try {
            const today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
            const hour = today.getHours();
            const restday = today.getDay() === 0 || today.getDay() === 6;
            const holiday = restday || JapaneseHolidays.isHoliday(today);
            const workingTime = hour > 10 && hour < 18;
            const type = holiday
                ? "daily"
                : workingTime ?
                    "work"
                    : "daily"
            const items = await fetchDaily({
                type: type,
                GITHUB_TOKEN,
                itemLimit: 3
            })
            const event = {
                type,
                items,
            };
            sendEvent(eventId, event);
        } catch (e) {
            console.warn(`Failed to fetch GitHub Project`, e);
        }
    };
