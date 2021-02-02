import React from "react";
import { MediumLabel, SmallLabel, Widget } from "@dashbling/client/Widget";

const bgColor = (props) => {
    return "#b865f4";
};

/**
 * @param {{
 *   title: string
 *   outerTemperature:number;
 *   outerMaxTemperature:number,
 *   outerMinTemperature:number,
 *   outerHumidity:number,
 *   innerTemperature: number,
 *   innerHumidity: number
 *   temperature: number,
 *   humidity: number
 * }}props
 * @returns {JSX.Element}
 * @constructor
 */
export const NatureRemoStatus = (props) => {
    return (
        <Widget title={props.title || "天気"} style={{ backgroundColor: bgColor(props) }}>
            <MediumLabel>気温: {Math.round(props.outerTemperature) ?? "？"}度</MediumLabel>
            <SmallLabel>
                （{Math.round(props.outerMinTemperature)} → {Math.round(props.outerMaxTemperature)}）
            </SmallLabel>
            <MediumLabel>室温: {props.innerTemperature ?? "？"}度</MediumLabel>
            <MediumLabel>湿度: {props.innerHumidity ?? "？"}％</MediumLabel>
        </Widget>
    );
};
