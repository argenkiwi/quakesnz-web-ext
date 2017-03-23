import * as React from "react";
import * as ReactDOM from "react-dom";
import { Feature } from "./model/Feature";
import { Options } from "./model/Options";
import { App } from "./components/App";
import { fetchQuakes } from "./fetch";

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        intensity: 1
    }, (options: Options) => fetchQuakes(options.intensity, (req) => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let features: Feature[] = JSON.parse(req.responseText).features;
                ReactDOM.render(
                    <App features={features} />,
                    document.getElementById("root")
                );
                if (features && features.length > 0) {
                    chrome.storage.sync.set({ latest: Date.parse(features[0].properties.time) });
                }
            } else console.log("Error loading quakes.");
        }
    }));
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.alarms.create("quakes-nz", { delayInMinutes: 1, periodInMinutes: 1 });
});
