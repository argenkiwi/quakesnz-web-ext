export function mmiToIntensity(mmi: number) {
    switch (mmi) {
        case 12:
        case 11:
        case 10:
        case 9:
        case 8:
        case 7:
            return 'Severe';
        case 6:
            return 'Strong';
        case 5:
            return 'Moderate';
        case 4:
            return 'Light';
        case 3:
            return 'Weak';
        default:
            return 'Unnoticeable';
    }
}

export function mmiToColour(mmi: number) {
    switch (mmi) {
        case 12:
        case 11:
        case 10:
        case 9:
        case 8:
        case 7:
            return '#ec1b23';
        case 6:
            return '#f6861f';
        case 5:
            return '#fee303';
        case 4:
            return '#1eae49';
        case 3:
            return '#1f73ba';
        default:
            return '#a7a7a7';
    }
}
