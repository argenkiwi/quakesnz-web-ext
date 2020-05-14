import * as React from "react";
import * as ReactDOM from "react-dom";
import Options from "./model/Options";
import PopUp from "./components/PopUp"

document.addEventListener('DOMContentLoaded', () => {
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.storage.sync.get({
        intensity: 3
    }, ({ intensity }: Options) => ReactDOM.render(
        <PopUp mmi={intensity} />,
        document.getElementById("root")
    ));
});
