import React from "react";
import { Widget, MediumLabel, LargeLabel, SmallLabel } from "@dashbling/client/Widget";

const dayjs = require("dayjs"); // v1.9.7
dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.tz.setDefault("Asia/Tokyo");

export const Clock = class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: new Date() };
    }

    formatTime(date) {
        return dayjs(date).format("HH:mm");
    }

    formatDate(date) {
        return dayjs(date).format("YYYY-MM-DD");
    }

    formatDay(date) {
        return dayjs(date).format("(dddd)");
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.setState({ time: new Date() }), 1000 * 30);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <Widget style={{ backgroundColor: this.props.backgroundColor }}>
                <MediumLabel>{this.formatDate(this.state.time)}</MediumLabel>
                <SmallLabel>{this.formatDay(this.state.time)}</SmallLabel>

                <LargeLabel style={{ marginTop: "10px" }}>{this.formatTime(this.state.time)}</LargeLabel>

                {this.props.title && <MediumLabel>{this.props.title}</MediumLabel>}
            </Widget>
        );
    }
};

Clock.defaultProps = {
    backgroundColor: "#359c94"
};
