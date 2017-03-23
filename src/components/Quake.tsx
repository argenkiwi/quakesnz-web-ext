import * as React from "react";
import * as moment from "moment";
import { Feature } from "../model/Feature";
import { Geometry } from "../model/Geometry";
import { mmiToIntensity } from "../utils";

export class Quake extends React.Component<Feature, undefined> {
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
        let split = Number(this.props.properties.magnitude).toFixed(1).split('.');
        return (
            <div className={["quake", mmiToIntensity(this.props.properties.mmi)].join(' ')}>
                <div className="magnitude"><span className="first">{split[0]}</span>.{split[1]}</div>
                <div className="intensity">{mmiToIntensity(this.props.properties.mmi)}</div>
                <div className="location">
                    <a href="#" onClick={() => this.openGoogleMaps(this.props.geometry)}>{this.props.properties.locality}</a>
                </div>
                <div className="depth">Depth: {Number(this.props.properties.depth).toFixed(0)} km</div>
                <div className="time">{moment(this.props.properties.time).fromNow()}</div>
            </div>
        );
    }
}