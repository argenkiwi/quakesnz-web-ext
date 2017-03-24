import { Options } from "./model/Options";

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        intensity: 3,
        notifications: true
    }, function (items: Options) {
        let form = <HTMLFormElement>document.forms[0];
        (<HTMLSelectElement>form.elements[0]).value = items.intensity.toString();
        (<HTMLInputElement>form.elements[1]).checked = items.notifications;
    });
});

document.forms[0].addEventListener('submit', (event) => {
    event.preventDefault();
    let form = <HTMLFormElement>document.forms[0];
    let notificationsEnabled = (<HTMLInputElement>form.elements[1]).checked;
    chrome.storage.sync.set({
        intensity: (<HTMLSelectElement>form.elements[0]).value,
        notifications: notificationsEnabled
    }, () => {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => status.textContent = '', 750);
        if (notificationsEnabled) {
            chrome.alarms.create("quakes-nz", {
                delayInMinutes: 1,
                periodInMinutes: 15
            });
        } else chrome.alarms.clear('quakes-nz');
    });
});