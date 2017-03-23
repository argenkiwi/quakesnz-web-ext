import { Options } from "./model/Options";

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        intensity: 1
    }, function (items: Options) {
        (<HTMLSelectElement>(<HTMLFormElement>document.forms[0]).elements[0]).value = items.intensity.toString();
    });
});

document.forms[0].addEventListener('submit', (event) => {
    event.preventDefault();
    chrome.storage.sync.set({
        intensity: (<HTMLSelectElement>(<HTMLFormElement>document.forms[0]).elements[0]).value
    }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
});