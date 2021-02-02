import React from "react";

import { connect } from "@dashbling/client/dashbling";
import { Dashboard } from "@dashbling/client/components";
import { Clock } from "./widgets/clock/Clock";
import { JSerInfoStatus } from "./widgets/jser-info-status/JSerInfoStatus";
import { GitHubProject } from "./widgets/github-project/GitHubProject";
import { NatureRemoStatus } from "./widgets/natureremo/NatureRemoStatus";
import { Calendar } from "./widgets/calendar/Calendar";
import { Notification } from "./widgets/notification/Notification";

const JSerInfoStatusWidget = connect("jser-info-status")(JSerInfoStatus);
const GitHubProjectWidget = connect("github-project")(GitHubProject);
const NatureRemoStatusWidget = connect("natureremo")(NatureRemoStatus);
const NotificationWidget = connect("notification")(Notification);
const CalendarWidget = connect("calendar")(Calendar);

export default (props) => {
    return (
        <Dashboard>
            <CalendarWidget/>
            <Clock/>
            <NatureRemoStatusWidget/>
            <JSerInfoStatusWidget/>
            {/*<GitHubProjectWidget/>*/}
            <NotificationWidget/>
        </Dashboard>
    );
};
