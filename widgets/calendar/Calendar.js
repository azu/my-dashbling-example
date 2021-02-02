import React from "react";
import { Widget, MediumLabel } from "@dashbling/client/Widget";
import dayjs from "dayjs";

const bgColor = (props) => {
    return "#42609C";
};
const isToday = (date) => {
    const today = dayjs();
    const day = dayjs(date);
    return day.isSame(today, "day");
};
const truncate = (value) => (value.length < 25 ? value : value.substring(0, 25) + "...");

/**
 *
 * @param {{ events: import("node-ical").VEvent[] }} props
 * @returns {JSX.Element}
 * @constructor
 */
export const Calendar = (props) => {
    console.log(props);
    const events = props.events || [];
    const eventList =
        events.length === 0 ? (
            <MediumLabel>予定なし</MediumLabel>
        ) : (
            events.map((item) => {
                if (isToday(item.start)) {
                    return (
                        <li
                            style={{
                                fontSize: "24px",
                                borderLeft: "3px solid rgb(221, 142, 6)",
                                marginBottom: "0.2em",
                                padding: "0.2em 0.8em",
                                color: "blue",
                                backgroundColor: "white"
                            }}
                            key={item.uid}
                        >
                            <span style={{ fontSize: "22px" }}>{dayjs(item.start).format("HH:mm")}</span>:{" "}
                            {truncate(item.summary)}
                        </li>
                    );
                } else {
                    return (
                        <li
                            style={{
                                fontSize: "16",
                                borderLeft: "3px solid rgb(221, 142, 6)",
                                marginBottom: "0.2em",
                                backgroundColor: "black",
                                padding: "0.2em 0.5em",
                                color: "hsl(0,0%,85%)"
                            }}
                            key={item.uid}
                        >
                            🔮 {truncate(item.summary)}
                        </li>
                    );
                }
            })
        );
    return (
        <Widget style={{ backgroundColor: bgColor(props), pading: 0 }}>
            <ul style={{ listStyle: "none", textAlign: "left" }}>{eventList}</ul>
        </Widget>
    );
};
