import { Feature } from "./model/Feature";

export function fetchQuakes(mmi: number,
    onSuccess: (features: Feature[]) => void,
    onError?: (error: string) => void) {
    let req = new XMLHttpRequest();
    req.open('GET', "https://api.geonet.org.nz/quake?MMI=" + mmi);
    req.onload = () => {
        let features = JSON.parse(req.responseText).features;
        if (req.status === 200) {
            if (features.length > 0) chrome.storage.sync.set({
                latest: Date.parse(features[0].properties.time)
            });
            onSuccess(features);
        } else if (onError) onError(req.statusText);
    }
    req.onerror = () => onError("Failed to retrieve quake reports.");;
    req.send();
}
