import { Options } from "./model/Options";
import { Feature } from "./model/Feature";
import { fetchQuakes } from "./fetch";
import { mmiToColour } from "./utils";
chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.sync.get({
        intensity: 1,
        latest: Date.now(),
    }, (options: Options) => fetchQuakes(options.intensity, (req) => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let features: Feature[] = JSON.parse(req.responseText).features;
                if (features && features.length > 0) {
                    let latest = Date.parse(features[0].properties.time);
                    if (options.latest < latest) {
                        let count = 0;
                        let maxMMI = 0;
                        for (let feature of features) {
                            if (options.latest < Date.parse(feature.properties.time)) {
                                count++;
                                maxMMI = Math.max(maxMMI, feature.properties.mmi);
                            } else break;
                        }
                        console.log("New quakes: " + count);
                        chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
                        chrome.browserAction.setBadgeBackgroundColor({ color: mmiToColour(maxMMI) });
                    }
                    console.log("New latest: " + latest);
                    chrome.storage.sync.set({ latest: latest });
                }
            } else console.log("Error loading quakes.");
        }
    }));
});

chrome.runtime.onInstalled.addListener(() => chrome.alarms.create("quakes-nz", {
    delayInMinutes: 1,
    periodInMinutes: 1
}));