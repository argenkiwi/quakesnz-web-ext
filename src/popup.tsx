import * as React from "react";
import * as ReactDOM from "react-dom";
import { Feature } from "./model/Feature";
import { Options } from "./model/Options";
import { PopUp } from "./components/PopUp"

document.addEventListener('DOMContentLoaded', () => {
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.storage.sync.get({
        intensity: 3
    }, (options: Options) => {
        ReactDOM.render(<PopUp mmi={options.intensity} />, document.getElementById("root"));
    });
});
