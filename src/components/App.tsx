import * as React from "react";
import * as moment from "moment";
import { Feature } from "../model/Feature";
import { Geometry } from "../model/Geometry";
import { mmiToIntensity } from "../utils";

export interface AppProps {
    features: Feature[]
}

export class App extends React.Component<AppProps, undefined>{
    openGoogleMaps(geometry: Geometry) {
        let url = "https://maps.google.co.nz"
            + "?q=loc:" + geometry.coordinates[1] + ',' + geometry.coordinates[0]
            + "&ll=" + geometry.coordinates[1] + ',' + geometry.coordinates[0]
            + "&z=10";

        chrome.tabs.query({ url: "*://*.google.co.nz/maps*" }, (tabs) => {
            if (tabs && tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, {
                    url: url,
                    highlighted: true
                });
            } else chrome.tabs.create({ url: url });
        });
    }

    render() {
        const quakes = this.props.features.map((feature: Feature) =>
            <li key={feature.properties.publicID}>
                Intensity: {mmiToIntensity(feature.properties.mmi)}<br />
                Time: {moment(feature.properties.time).fromNow()}<br />
                Depth: {Number(feature.properties.depth).toFixed(0)} km<br />
                Magnitude: {Number(feature.properties.magnitude).toFixed(1)}<br />
                Location: <a href="#" onClick={() => this.openGoogleMaps(feature.geometry)}>{feature.properties.locality}</a>
            </li>
        );

        return <ul>{quakes}</ul>;
    }
}