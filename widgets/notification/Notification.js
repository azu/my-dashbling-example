import React from "react";
import { MediumLabel, Widget } from "@dashbling/client/Widget";

export const Notification = (props) => {
    return (
        <Widget>
            <MediumLabel>
                <p style={{ color: "white" }}>{props.message ? props.message : "No Message"}</p>
            </MediumLabel>
        </Widget>
    );
};
