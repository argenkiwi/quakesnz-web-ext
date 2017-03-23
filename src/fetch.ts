export function fetchQuakes(mmi: number, callback: (req: XMLHttpRequest, ev: Event) => void) {
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.geonet.org.nz/quake?MMI=" + mmi, true);
    req.send(null);
    req.onreadystatechange = (ev) => callback(req, ev);
}
