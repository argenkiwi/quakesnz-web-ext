import { Feature } from "./model/Feature";

export function fetchQuakes(mmi: number,
    onSuccess: (features: Feature[]) => void,
    onError?: (error: string) => void) {
    window.fetch('https://api.geonet.org.nz/quake?MMI=' + mmi)
        .then(req => req.json())
        .then(data => data.features)
        .then(features => {
            if (features.length) chrome.storage.sync.set({
                latest: Date.parse(features[0].properties.time)
            });
            onSuccess(features);
        })
        .catch(() => onError("Failed to retrieve quake reports."));
}
