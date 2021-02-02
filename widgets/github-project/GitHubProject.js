import React from "react";
import { MediumLabel, SmallLabel, Widget } from "@dashbling/client/Widget";

const bgColor = props => {
    return "#429c95";
};
/**
 *
 * @param {{ type: "daily" | "work" items?:{ title:string, url:string}[] }} props
 * @returns {JSX.Element}
 * @constructor
 */
export const GitHubProject = props => {
    const items = props.items || [];
    const type = props.type === "daily" ? "🏠" : "👔"
    return (
        <Widget
            title={`${type} TODO ${type}`}
            style={{ backgroundColor: bgColor(props), }}
        >
            <ul style={{ listStyle: "none", textAlign: "left" }}>
                {
                    items.map(item => {
                        return <li
                            style={{
                                fontSize: "24px",
                                borderLeft: "3px solid rgb(221, 142, 6)",
                                marginBottom: "0.2em",
                                padding: "0.2em 0.8em",
                                backgroundColor: "white"
                            }}
                            key={item.url}><a href={item.url}>{item.title}</a></li>
                    })
                }
            </ul>
        </Widget>
    );
};
