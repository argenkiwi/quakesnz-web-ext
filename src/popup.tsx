import * as React from "react";
import * as ReactDOM from "react-dom";
import { fetchQuakes } from "./fetch";
import { Feature } from "./model/Feature";
import { Options } from "./model/Options";
import { Quake } from "./components/Quake";

document.addEventListener('DOMContentLoaded', () => {
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.storage.sync.get({
        intensity: 1
    }, (options: Options) => fetchQuakes(options.intensity, (req) => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let features: Feature[] = JSON.parse(req.responseText).features;
                if (features.length > 0) chrome.storage.sync.set({
                    latest: Date.parse(features[0].properties.time)
                });

                ReactDOM.render(
                    <div>
                        {features.map((feature) =>
                            <Quake key={feature.properties.publicID}
                                geometry={feature.geometry}
                                properties={feature.properties} />
                        )}
                    </div>, document.getElementById("root"));
            } else console.log("Error loading quakes.");
        }
    }));
});
