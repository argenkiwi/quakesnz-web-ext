import Feature from "./model/Feature";

export function fetchQuakes(mmi: number,
    onSuccess: (features: Feature[]) => void,
    onError?: (error: string) => void) {
    fetch('https://api.geonet.org.nz/quake?MMI=' + mmi)
        .then(response => response.json())
        .then(({ features }) => {
            if (features.length) chrome.storage.sync.set({
                latest: Date.parse(features[0].properties.time)
            });
            onSuccess(features);
        })
        .catch(() => onError("Failed to retrieve quake reports."));
}
