import React from "react";
import { LargeLabel, Widget } from "@dashbling/client/Widget";

const bgColor = props => {
    return props.count > 10 ? "#429c6a" : "#DD8E06";
};

const label = props => {
    return props.count >= 13 ? `${props.count}🎉` : props.count;
};

export const JSerInfoStatus = props => {
    return (
        <Widget
            title={"JSer.info Status"}
            style={{ backgroundColor: bgColor(props) }}
            href={"https://jser.info/status-of-post/"}
        >
            <LargeLabel>{label(props)}</LargeLabel>
        </Widget>
    );
};
