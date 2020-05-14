import Options from "./model/Options";

document.addEventListener('DOMContentLoaded', () => chrome.storage.sync.get({
    intensity: 3,
    notifications: true
}, function (items: Options) {
    const form = document.forms[0] as HTMLFormElement;
    (form.elements[0] as HTMLSelectElement).value = items.intensity.toString();
    (form.elements[1] as HTMLInputElement).checked = items.notifications;
}));

document.forms[0].addEventListener('submit', event => {
    event.preventDefault();
    const form = <HTMLFormElement>document.forms[0];
    const notificationsEnabled = (<HTMLInputElement>form.elements[1]).checked;
    chrome.storage.sync.set({
        intensity: (<HTMLSelectElement>form.elements[0]).value,
        notifications: notificationsEnabled
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => status.textContent = '', 750);
        notificationsEnabled ? chrome.alarms.create("quakes-nz", {
            delayInMinutes: 1,
            periodInMinutes: 15
        }) : chrome.alarms.clear('quakes-nz');
    });
});
