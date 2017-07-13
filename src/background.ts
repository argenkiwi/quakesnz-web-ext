import Options from "./model/Options";
import Feature from "./model/Feature";
import { fetchQuakes } from "./fetch";
import { mmiToColour } from "./utils";

chrome.alarms.onAlarm.addListener(() => chrome.storage.sync.get({
    intensity: 3,
    latest: Date.now(),
}, ({ intensity, latest }: Options) => fetchQuakes(intensity, features => {
    if (features.length > 0) {
        let count = 0;
        let maxMMI = 0;
        for (let { properties } of features) {
            if (latest < Date.parse(properties.time)) {
                count++;
                maxMMI = Math.max(maxMMI, properties.mmi);
            } else break;
        }

        chrome.browserAction.setBadgeText({
            text: count > 0 ? count.toString() : ""
        });

        chrome.browserAction.setBadgeBackgroundColor({
            color: mmiToColour(maxMMI)
        });
    }
}, error => console.log(error))));

chrome.runtime.onInstalled.addListener(() => chrome.alarms.create("quakes-nz", {
    delayInMinutes: 1,
    periodInMinutes: 15
}));