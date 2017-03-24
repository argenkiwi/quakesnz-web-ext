import * as React from "react";
import * as ReactDOM from "react-dom";
import { Feature } from "./model/Feature";
import { Options } from "./model/Options";
import { Quake } from "./components/Quake";
import { fetchQuakes } from "./fetch";

document.addEventListener('DOMContentLoaded', () => {
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.storage.sync.get({
        intensity: 3
    }, (options: Options) => fetchQuakes(options.intensity, (features) => {
        ReactDOM.render(
            <div>
                {features.map((feature) =>
                    <Quake key={feature.properties.publicID}
                        geometry={feature.geometry}
                        properties={feature.properties} />
                )}
            </div>, document.getElementById("root"));
    }, (error) => {
        ReactDOM.render(<p>{error}</p>, document.getElementById("root"))
    }));
});
